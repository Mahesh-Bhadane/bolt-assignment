"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import UserImage from "./UserImage";
import { deleteUser } from "@/services";
import ConfirmationDialog from "./ConfirmationDialog";

interface UserProps {
  user: User;
  userDeleted?: (userId: number) => void;
  editClick?: (user: User) => void;
}

const UserCard = ({ user, userDeleted, editClick }: UserProps) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      await deleteUser(user.id);
      userDeleted?.(user.id);
      setIsConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmationOpen(false);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <UserImage
          src={user.avatar ?? "https://github.com/shadcn.png"}
          alt={"user"}
          height="h-48"
          width="w-full"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.name ? user.name : `${user?.first_name} ${user.last_name}`}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.email ??
            `${user?.name?.replace(/\s/g, "").toLowerCase()}@example.com`}
        </span>
        <div className="flex mt-4 md:mt-6 gap-4">
          <Button
            variant={"primary"}
            onClick={(e) => {
              e.stopPropagation();
              editClick?.(user);
            }}
          >
            Edit
          </Button>
          <Button variant={"destructiveOutline"} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
      {isConfirmationOpen && (
        <ConfirmationDialog
          isOpen={isConfirmationOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title="Delete User"
          message={`Are you sure you want to delete?`}
        />
      )}
    </div>
  );
};

export default UserCard;
