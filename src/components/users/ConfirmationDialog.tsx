import React, { useState } from "react";
import { Button } from "../ui/button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  title: string;
  message: string;
}

const ConfirmationDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}: ConfirmationDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm();
    } catch (error) {
      console.error("Error during confirmation:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Confirm"}{" "}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmationDialog;
