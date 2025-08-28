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
  const [formData, setFormData] = useState<Partial<subscriptionProduct>>({
    billing_cycle: "monthly", // Set default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      [name]:
        type === "file"
          ? files?.[0] || null
          : name === "billing_cycle"
          ? (value as "monthly" | "yearly")
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();

      // Append all form fields to FormData with proper validation
      Object.entries(formData).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          console.log(`Skipping empty field: ${key}`);
          return;
        }

        if (isFile(value)) {
          data.append(key, value);
        } else {
          data.append(key, String(value));
        }
      });

      // Ensure billing_cycle has a value
      if (!data.has("billing_cycle")) {
        console.log("No billing_cycle found, setting default to monthly");
        data.append("billing_cycle", "monthly");
      }

      await dispatch(createProduct(data)).unwrap();

      // Success
      setShowForm(false);
      setFormData({ billing_cycle: "monthly" }); // Reset with default
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mt-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto flex flex-col gap-4 animate-fadeIn"
      onSubmit={handleSubmit}
    >
      {SubscriptionProduct.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name as keyof subscriptionProduct] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required={field.required}
              rows={3}
            />
          ) : field.type === "select" && field.options ? (
            <select
              name={field.name}
              value={formData[field.name as keyof subscriptionProduct] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required={field.required}
            >
              <option value="">Select {field.label}</option>
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
                field.type === "file"
                  ? undefined
                  : (formData[
                      field.name as keyof subscriptionProduct
                    ] as string) || ""
              }
              onChange={handleChange}
              placeholder={field.placeholder}
              accept={field.type === "file" ? "image/*" : undefined}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required={field.required}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-4 gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors flex-1 font-medium"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="px-6 py-2 rounded-lg border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => {
            setShowForm(false);
            setFormData({ billing_cycle: "monthly" }); // Reset form
          }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddProduct;
