"use client";

import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Button } from "../ui/button";
import { useInView } from "react-intersection-observer";
import { fetchUsers } from "./actions";
import UserDialog from "./UserDialog";
import { deleteUser } from "@/services";
import Spinner from "../ui/spinner";

interface UserListProps {
  initialUsers: User[];
}

const UserList = ({ initialUsers }: UserListProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [endOfPageReached, setEndOfPageReached] = useState(false);
  const [ref, inView] = useInView();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadMoreUsers = async () => {
    const next = page + 1;
    const newUsers = await fetchUsers(next);
    if (newUsers?.length) {
      setPage(next);
      setUsers((prev) => [...(prev ?? []), ...newUsers]);
    } else {
      setEndOfPageReached(true);
    }
  };

  useEffect(() => {
    if (inView && !endOfPageReached) {
      loadMoreUsers();
    }
  }, [inView, endOfPageReached]);

  const openDialog = (user: User | null = null) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleUserAdded = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    closeDialog();
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    closeDialog();
  };

  const handleUserDeleted = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className=" container mx-auto py-4 flex flex-col items-center">
        <Button onClick={() => openDialog()}>Add New User</Button>
      </div>
      <div className="container mx-auto py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onUserDeleted={handleUserDeleted}
              onEditClick={() => openDialog(user)}
            />
          ))}
        </div>
        {/* loading spinner */}
        <div
          ref={ref}
          className={
            endOfPageReached
              ? "hidden"
              : "col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
          }
        >
          <Spinner />
        </div>
      </div>

      {isDialogOpen && (
        <UserDialog
          user={selectedUser}
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onFormSubmit={selectedUser ? handleUserUpdated : handleUserAdded}
        />
      )}
    </>
  );
};

export default UserList;
