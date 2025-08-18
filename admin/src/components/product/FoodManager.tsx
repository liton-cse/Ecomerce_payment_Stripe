"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star, MapPin, Clock, Edit, Save, X, Plus, Minus } from "lucide-react";

interface FoodItem {
  id: number;
  dish: string;
  imgdata: string;
  address: string;
  delimg: string;
  somedata: string;
  price: number;
  rating: string;
  arrimg: string;
  qnty: number;
}

const initialFoodData: FoodItem = {
  id: 1,
  dish: "punjabi",
  imgdata:
    "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
  address: "North Indian, Biryani, Mughlai",
  delimg:
    "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
  somedata: "1175 + order placed from here recently",
  price: 350,
  rating: "3.8",
  arrimg:
    "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
  qnty: 0,
};

function FoodManager() {
  const [foodData, setFoodData] = useState<FoodItem>(initialFoodData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<FoodItem>(initialFoodData);

  const handleEdit = () => {
    setEditData(foodData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setFoodData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(foodData);
    setIsEditing(false);
  };

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase") {
      setFoodData((prev) => ({ ...prev, qnty: prev.qnty + 1 }));
    } else if (action === "decrease" && foodData.qnty > 0) {
      setFoodData((prev) => ({ ...prev, qnty: prev.qnty - 1 }));
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl font-bold capitalize">
              {isEditing ? "Edit Food Item" : foodData.dish}
            </span>
            {!isEditing && (
              <Badge variant="secondary" className="ml-auto">
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                {foodData.rating}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <Button onClick={handleEdit} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
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
      <CardContent className="space-y-4">
        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <img
                src={foodData.imgdata || "/placeholder.svg"}
                alt={foodData.dish}
                className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>{foodData.address}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={foodData.delimg || "/placeholder.svg"}
                  alt="Delivery"
                  className="w-8 h-8"
                />
                <div className="flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {foodData.somedata}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{foodData.price}
                  </span>
                  <img
                    src={foodData.arrimg || "/placeholder.svg"}
                    alt="Arrow"
                    className="w-6 h-6"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={foodData.qnty === 0}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-lg min-w-[2rem] text-center">
                    {foodData.qnty}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange("increase")}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="dish">Dish Name</Label>
                <Input
                  id="dish"
                  value={editData.dish}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, dish: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="imgdata">Image URL</Label>
                <Input
                  id="imgdata"
                  value={editData.imgdata}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      imgdata: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="address">Address/Category</Label>
                <Input
                  id="address"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  value={editData.rating}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, rating: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="somedata">Order Information</Label>
                <Textarea
                  id="somedata"
                  value={editData.somedata}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      somedata: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default FoodManager;
