// src/components/user/UserForm.tsx
import { useState } from "react";
import type { UserData } from "@/type/auth/auth.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userFields } from "@/data/Product";
import { useAppDispatch } from "@/redux/app/store";
import { addUser, updateUser } from "@/redux/features/user/userSliice";

type UserFormProps = {
  onSubmitSuccess?: () => void;
  initialData?: Partial<UserData>; // for edit mode
};

export default function UserForm({
  onSubmitSuccess,
  initialData,
}: UserFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<UserData>>(
    initialData || {}
  );

  const handleChange = (key: keyof UserData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData._id) {
        await dispatch(updateUser({ id: formData._id, user: formData }));
      } else {
        await dispatch(addUser(formData));
      }
      onSubmitSuccess?.();
      setFormData({});
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <form
      className="space-y-6 p-6 md:p-8 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 shadow-lg max-w-xl mx-auto transition-all"
      onSubmit={handleSubmit}
    >
      {userFields.map(({ key, placeholder, type, required }) => {
        if (type === "checkbox") {
          return (
            <label
              key={key}
              className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                checked={!!formData[key]}
                onChange={(e) => handleChange(key, e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              {placeholder}
            </label>
          );
        }
        return (
          <Input
            key={key}
            type={type}
            placeholder={placeholder}
            value={(formData[key] as string) || ""}
            required={required}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        );
      })}

      <Button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        {formData._id ? "Update User" : "Create User"}
      </Button>
    </form>
  );
}
