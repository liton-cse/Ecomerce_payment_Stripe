// components/admin/DishForm.tsx
import { type FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/app/store";
import {
  fetchDishById,
  saveDish,
  clearCurrentDish,
} from "../../../redux/features/product/dishSlice";
import { product } from "@/data/Product";
import type { Dish } from "@/type/product/product.type";

interface DishFormProps {
  id?: string;
  onSubmitSuccess?: () => void;
}

export const DishForm: FC<DishFormProps> = ({ id, onSubmitSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentDish, loading } = useSelector(
    (state: RootState) => state.dish
  );

  const [formData, setFormData] = useState<Partial<Dish>>({});

  useEffect(() => {
    if (id) dispatch(fetchDishById(id));
    else dispatch(clearCurrentDish());
  }, [id]);

  useEffect(() => {
    if (currentDish) setFormData(currentDish);
  }, [currentDish]);

  const handleChange = (key: keyof Dish, value: string | number | File) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        data.append(key, value as string | Blob);
    });
    await dispatch(saveDish({ id, data }));
    onSubmitSuccess?.();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-1 border border-gray-50 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-900 shadow-lg transition-all"
    >
      {product.map(({ key, type, placeholder, required }) => (
        <div key={key} className="flex flex-col">
          <input
            type={type}
            value={
              type === "file"
                ? undefined
                : (formData[key as keyof Dish] as string | number) || ""
            }
            onChange={(e) =>
              handleChange(
                key as keyof Dish,
                type === "file"
                  ? e.target.files?.[0]!
                  : type === "number"
                  ? Number(e.target.value)
                  : e.target.value
              )
            }
            placeholder={placeholder}
            required={required}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          {id ? "Update Dish" : "Submit"}
        </button>
      </div>
    </form>
  );
};
