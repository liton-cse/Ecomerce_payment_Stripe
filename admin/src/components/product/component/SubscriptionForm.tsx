import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SubscriptionProduct } from "@/data/Product";
import { useAppDispatch } from "@/redux/app/store";
import { createProduct } from "@/redux/features/product/subscriptionSlice";
import type { subscriptionProduct } from "@/type/product/product.type";

interface AddProductProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProps> = ({ setShowForm }) => {
  const [formData, setFormData] = useState<Partial<subscriptionProduct>>({});
  const dispatch = useAppDispatch();
  // Type guard for File
  const isFile = (val: any): val is File => val instanceof File;
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const data = new FormData();
    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value == null || value == undefined) return;

      if (isFile(value)) {
        // Handle file uploads
        data.append(key, value);
      } else {
        // Handle regular form fields
        data.append(key, String(value));
      }
    });
    try {
      await dispatch(createProduct(data));
      setShowForm(false);
      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      className="mt-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto flex flex-col gap-4 animate-fadeIn"
      onSubmit={handleSubmit} // Use onSubmit for the form
    >
      {SubscriptionProduct.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={field.required}
            />
          ) : field.type === "select" && field.options ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={field.required}
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={
                field.type === "file" ? undefined : formData[field.name] || ""
              }
              onChange={handleChange}
              placeholder={field.placeholder}
              accept={field.type === "file" ? "image/*" : undefined}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={field.required}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4">
        <Button
          type="submit" // Use type="submit" here
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </Button>
        <Button
          type="button"
          variant="outline"
          className="px-4 py-2 rounded-lg"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddProduct;
