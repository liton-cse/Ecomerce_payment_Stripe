// src/components/user/userActions.tsx
import UserForm from "./UserForm";
import type { Action } from "@/type/product/product.type"; // reuse Action type
import { Plus, Edit, Trash2 } from "lucide-react";

export const userActions: Action[] = [
  {
    label: "Add User",
    icon: Plus,
    renderForm: (onSubmitSuccess) => (
      <UserForm onSubmitSuccess={onSubmitSuccess} />
    ),
  },
  {
    label: "Edit User",
    icon: Edit,
    renderForm: (onSubmitSuccess, id?: string) => (
      <UserForm onSubmitSuccess={onSubmitSuccess} initialData={{ _id: id }} />
    ),
  },
  {
    label: "Remove User",
    icon: Trash2,
    handleFunction: async (id: string, onSubmitSuccess) => {
      if (!id) return;
      if (!confirm("Are you sure you want to delete this dish?")) return;
      try {
        alert("Dish removed successfully!");
        onSubmitSuccess?.();
      } catch (err) {
        console.error("Failed to delete dish:", err);
        alert("Failed to delete dish");
      }
    },
  },
];
