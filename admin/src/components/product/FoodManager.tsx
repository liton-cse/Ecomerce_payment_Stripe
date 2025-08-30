import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star, MapPin, Clock, Edit, Save, X, Plus, Minus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/app/store";
import {
  consumeRefresher,
  fetchDishes,
  updateDish,
  deleteDish, // Add this import if you have a delete action
} from "@/redux/features/product/dishSlice";
import type { Dish } from "@/type/product/product.type";
import { ClipLoader } from "react-spinners";
import axiosInstance from "@/utils/axios";
function FoodManager() {
  const dispatch = useAppDispatch();
  const { dishes, loading, refresher } = useAppSelector((state) => state.dish);
  const [foodData, setFoodData] = useState<Dish[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Dish | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store actual file

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  useEffect(() => {
    setFoodData(dishes);
  }, [dishes]);

  useEffect(() => {
    if (refresher) {
      dispatch(fetchDishes());
      dispatch(consumeRefresher());
    }
  }, [refresher, dispatch]);

  const handleEdit = (_id: string) => {
    const found = foodData.find((d) => d._id === _id) || null;
    setEditData(found);
    setIsEditing(!!found);
    setImageFile(null); // Reset image file when starting edit
  };

  const handleSave = async () => {
    if (editData?._id) {
      try {
        // Always create FormData to maintain consistency
        const formData = new FormData();
        formData.append("dish", editData.dish);
        formData.append("price", String(editData.price));
        formData.append("rating", String(editData.rating));
        formData.append("address", editData.address);
        formData.append("somedata", editData.somedata);

        // Only append image if there's a new file
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await dispatch(updateDish({ _id: editData._id, data: formData }));

        setIsEditing(false);
        setEditData(null);
        setImageFile(null);
      } catch (error) {
        console.error("Error updating dish:", error);
      }
    }
  };

  const handleDelete = async (_id: string) => {
    try {
      // Confirm delete action
      if (!window.confirm("Are you sure you want to delete this dish?")) {
        return;
      }
      // Make sure we're passing the ID correctly
      const result = await dispatch(deleteDish(_id));
      // Only update local state after successful deletion
      if (deleteDish.fulfilled.match(result)) {
        setFoodData((prev) => prev.filter((dish) => dish._id !== _id));
        setIsEditing(false);
        setEditData(null);
        setImageFile(null);
      } else {
        console.error("Delete failed:", result);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
    setImageFile(null); // Clear image file on cancel
  };
  const handleQuantityChange = async (
    _id: string,
    action: "increase" | "decrease"
  ) => {
    const dish = foodData.find((d) => d._id === _id);
    if (!dish) return;

    let newQnty = dish.qnty;
    if (action === "increase") {
      newQnty += 1;
    } else if (action === "decrease" && dish.qnty > 0) {
      newQnty -= 1;
    } else {
      return; // No change needed
    }

    // Update local state immediately for better UX
    setFoodData((prev) =>
      prev.map((d) => (d._id === _id ? { ...d, qnty: newQnty } : d))
    );

    // Don't make the API call if the quantity is 0
    if (newQnty === 0) {
      return; // Exit without making an API call if the quantity is 0
    }

    try {
      await axiosInstance.put(`/products/${_id}`, { qnty: newQnty });
    } catch (error) {
      console.error("Error updating quantity:", error);
      setFoodData((prev) =>
        prev.map((d) => (d._id === _id ? { ...d, qnty: dish.qnty } : d))
      );
    }
  };

  // Update state for various field types
  const handleChange = (field: keyof Dish, value: string) => {
    if (!editData) return;

    let processedValue: any = value;

    // Convert to appropriate types
    if (field === "rating" || field === "price" || field === "qnty") {
      processedValue = value === "" ? 0 : Number(value);
    }

    setEditData((prev) => (prev ? { ...prev, [field]: processedValue } : prev));
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // Store the actual file

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editData) {
          setEditData({
            ...editData,
            image: reader.result as string, // This is just for preview
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#4B5563"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {foodData.map((dish) => (
        <Card
          key={dish._id}
          className="overflow-hidden hover:shadow-xl transition-all duration-300 max-w-full mx-auto"
        >
          <CardHeader className="pb-4 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold capitalize">
                  {isEditing && editData?._id === dish._id
                    ? "Edit Food Item"
                    : dish.dish}
                </span>
                {!isEditing && (
                  <Badge variant="secondary" className="ml-auto">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {dish.rating}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {!isEditing || editData?._id !== dish._id ? (
                  <>
                    <Button
                      onClick={() => handleEdit(dish._id)}
                      variant="outline"
                      size="sm"
                      className="text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(dish._id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Section */}
              <div className="space-y-4">
                {!isEditing || editData?._id !== dish._id ? (
                  <>
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/image/${
                        dish.image
                      }`}
                      alt={dish.dish}
                      className="w-full h-48 md:h-56 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    />
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>{dish.address}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor={`dish-${dish._id}`}>Dish Name</Label>
                      <Input
                        id={`dish-${dish._id}`}
                        value={editData?.dish || ""}
                        onChange={(e) => handleChange("dish", e.target.value)}
                        placeholder="Enter dish name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`image-${dish._id}`}>Image</Label>
                      <Input
                        id={`image-${dish._id}`}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {(editData?.image || dish.image) && (
                        <img
                          src={
                            imageFile && editData?.image?.startsWith("data:")
                              ? editData.image // Show preview for new file
                              : `${import.meta.env.VITE_IMAGE_URL}/image/${
                                  dish.image
                                }` // Show existing image
                          }
                          alt="Preview"
                          className="w-32 h-32 object-cover mt-2 rounded-md border"
                        />
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`address-${dish._id}`}>Address</Label>
                      <Input
                        id={`address-${dish._id}`}
                        value={editData?.address || ""}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        placeholder="Enter address"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Right Section */}
              <div className="space-y-4">
                {!isEditing || editData?._id !== dish._id ? (
                  <>
                    <div className="flex items-center gap-3">
                      <img
                        src="/delimg.png"
                        alt="Delivery"
                        className="w-8 h-8"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dish.somedata}
                        </p>
                      </div>
                    </div>

                    <div className="dark:bg-slate-800 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{dish.price}
                      </span>
                      <img src="/arrimg.png" alt="Arrow" className="w-6 h-6" />

                      <div className="flex items-center gap-3 ml-auto sm:ml-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(dish._id, "decrease")
                          }
                          disabled={dish.qnty === 0}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-semibold text-lg min-w-[2rem] text-center">
                          {dish.qnty}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(dish._id, "increase")
                          }
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor={`price-${dish._id}`}>Price (₹)</Label>
                      <Input
                        id={`price-${dish._id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={editData?.price || ""}
                        onChange={(e) => handleChange("price", e.target.value)}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`rating-${dish._id}`}>Rating</Label>
                      <Input
                        id={`rating-${dish._id}`}
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={editData?.rating || ""}
                        onChange={(e) => handleChange("rating", e.target.value)}
                        placeholder="Enter rating (0-5)"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`somedata-${dish._id}`}>
                        Order Information
                      </Label>
                      <Textarea
                        id={`somedata-${dish._id}`}
                        value={editData?.somedata || ""}
                        onChange={(e) =>
                          handleChange("somedata", e.target.value)
                        }
                        placeholder="Enter order information"
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FoodManager;
