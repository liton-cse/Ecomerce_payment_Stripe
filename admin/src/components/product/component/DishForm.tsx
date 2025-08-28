import { type FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/app/store";
import {
  fetchDishes,
  saveDish,
} from "../../../redux/features/product/dishSlice";
import type { Dish } from "@/type/product/product.type";
import { product } from "@/data/Product";
interface DishFormProps {
  id?: string;
  onSubmitSuccess?: () => void;
}

export const DishForm: FC<DishFormProps> = ({ id, onSubmitSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentDish, loading } = useSelector(
    (state: RootState) => state.dish
  );

  const [Data, setFormData] = useState<Partial<Dish>>({});
  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  useEffect(() => {
    if (currentDish) setFormData(currentDish);
  }, [currentDish]);

  // Type guard for File
  const isFile = (val: any): val is File => val instanceof File;

  const handleChange = (key: keyof Dish, value: string | number | File) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if we have any data to submit
    if (Object.keys(Data).length === 0) {
      console.error("No data to submit");
      return;
    }

    const data = new FormData();

    // Add form data to FormData object
    Object.entries(Data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Check if the value is a file
      if (isFile(value)) {
        data.append(key, value, value.name); // Append file as-is
      } else {
        data.append(key, String(value)); // Append strings/numbers as strings
      }
    });
    try {
      const result = await dispatch(saveDish({ data }));
      if (saveDish.fulfilled.match(result)) {
        onSubmitSuccess?.();
      } else {
        console.error("Failed to save dish:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border border-gray-50 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 shadow-lg transition-all"
    >
      {product.map(({ key, type, placeholder, required }) => (
        <div key={key} className="flex flex-col">
          <input
            type={type}
            value={
              type === "file"
                ? undefined
                : (Data[key as keyof Dish] as string | number) || ""
            }
            onChange={(e) => {
              if (type === "file") {
                const file = e.target.files?.[0];
                if (file) {
                  handleChange(key as keyof Dish, file);
                }
              } else {
                handleChange(
                  key as keyof Dish,
                  type === "number" ? Number(e.target.value) : e.target.value
                );
              }
            }}
            placeholder={placeholder}
            required={required}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          {loading ? "Submitting..." : id ? "Update Dish" : "Submit"}
        </button>
      </div>
    </form>
  );
};
