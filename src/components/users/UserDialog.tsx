import { createUser, updateUser } from "@/services";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFormSubmit: (newUser: User) => void;
  user?: User | null;
}

const UserDialog = ({
  isOpen,
  onClose,
  onFormSubmit,
  user,
}: UserDialogProps) => {
  const formatUser = {
    name: user?.name ? user?.name : user?.first_name + " " + user?.last_name,
    job: user?.job ?? "",
  };
  const [formData, setFormData] = useState({
    name: user ? formatUser?.name : "",
    job: user ? formatUser?.job : "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", job: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { name, job } = formData;
      if (user) {
        const updatedUser = await updateUser(user.id, name, job);
        onFormSubmit({ ...user, name: updatedUser.name, job: updatedUser.job });
      } else {
        const newUser = await createUser(name, job);
        onFormSubmit(newUser);
      }
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 flex justify-center">
          {user ? `Edit User` : "Add New User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="job" className="block font-medium mb-1">
              Job
            </label>
            <Input
              type="text"
              id="job"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : `${user ? "Edit" : "Add"} User`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UserDialog;
