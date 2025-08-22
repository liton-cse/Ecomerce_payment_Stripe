import { DishForm } from "./DishForm";
import type { Action } from "@/type/product/product.type";
import { Plus, Edit, Trash2 } from "lucide-react";

export const actions: Action[] = [
  {
    label: "Add New Item",
    icon: Plus,
    renderForm: (onSubmitSuccess) => (
      <DishForm onSubmitSuccess={onSubmitSuccess} />
    ),
  },
  {
    label: "Edit Items",
    icon: Edit,
    renderForm: (onSubmitSuccess, id?: string) => (
      <DishForm id={id} onSubmitSuccess={onSubmitSuccess} />
    ),
  },
  {
    label: "Remove Items",
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
