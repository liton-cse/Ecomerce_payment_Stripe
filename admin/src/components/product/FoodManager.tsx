import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star, MapPin, Clock, Edit, Save, X, Plus, Minus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/app/store";
import { fetchDishes, updateDish } from "@/redux/features/product/dishSlice";
import type { Dish } from "@/type/product/product.type";
import { ClipLoader } from "react-spinners";

function FoodManager() {
  const dispatch = useAppDispatch();
  const { dishes, loading } = useAppSelector((state) => state.dish);
  const [foodData, setFoodData] = useState<Dish[]>([]); // Handle multiple dishes
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Dish | null>(null);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  useEffect(() => {
    setFoodData(dishes);
  }, [dishes]);

  const handleEdit = (index: number) => {
    setEditData(foodData[index]);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      // Handle the saving logic (update Redux state or backend API)
      const updatedDishes = foodData.map((dish) =>
        dish._id === editData._id ? editData : dish
      );
      setFoodData(updatedDishes);
      setIsEditing(false);
    }
  };

  const handleDelete = (index: number) => {
    console.log(index);
    if (editData) {
      const updatedDishes = foodData.filter(
        (dish) => dish._id !== editData._id
      );
      setFoodData(updatedDishes);
      setIsEditing(false);
      setEditData(null); // Clear the edit state
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null); // Reset edit state
  };

  const handleQuantityChange = (
    _id: string,
    action: "increase" | "decrease"
  ) => {
    setFoodData((prev) => {
      const updatedDishes = [...prev]; // Create a copy of the dishes array
      const dishIndex = updatedDishes.findIndex((dish) => dish._id === _id); // Find the index of the dish by its _id

      if (dishIndex !== -1) {
        const dish = updatedDishes[dishIndex]; // Get the dish object at the found index
        if (action === "increase") {
          dish.qnty += 1; // Increase the quantity
          dispatch(
            updateDish({
              _id,
              qnty: dish.qnty,
            })
          ); // Dispatch the update for saving
        } else if (action === "decrease" && dish.qnty > 0) {
          dish.qnty -= 1; // Decrease the quantity
        }
      }

      return updatedDishes; // Return the updated dishes array
    });
  };

  // Update state for numeric fields like `rating` and `price` with type conversion
  const handleChange = (field: keyof Dish, value: string) => {
    if (field === "rating" || field === "price") {
      // Convert to number for fields that should be numbers
      setEditData((prev) =>
        prev ? { ...prev, [field]: Number(value) } : prev
      );
    } else {
      setEditData((prev) => (prev ? { ...prev, [field]: value } : prev));
    }
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (editData) {
          setEditData({
            ...editData,
            image: reader.result as string, // Use base64 URL for image preview
          });
        }
      };

      if (file) {
        reader.readAsDataURL(file); // Convert image to base64 string
      }
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
          key={dish._id} // Use _id as the key for each dish
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
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(dish._id)} // Handle delete
                      variant="outline"
                      size="sm"
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
                      {editData?.image && (
                        <img
                          src={`${import.meta.env.VITE_IMAGE_URL}/image/${
                            editData.image
                          }`}
                          alt="Preview"
                          className="w-32 h-32 object-cover mt-2 rounded-md"
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
                        value={editData?.price || ""}
                        onChange={(e) => handleChange("price", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`rating-${dish._id}`}>Rating</Label>
                      <Input
                        id={`rating-${dish._id}`}
                        value={editData?.rating || ""}
                        onChange={(e) => handleChange("rating", e.target.value)}
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
