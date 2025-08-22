"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Edit, Save, X, Plus, Settings, Trash2 } from "lucide-react";

interface SpecialProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  image_url: string;
  stripe_price_id: string;
}

const initialProduct: SpecialProduct = {
  id: 1,
  name: "Netflix Premium",
  description: "4K Ultra HD streaming on up to 4 devices simultaneously",
  price: 100,
  billing_cycle: "monthly",
  image_url: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
  stripe_price_id: "price_1RvMbRLYjp5zK6UojQQZ6Bbi",
};

function ProductManager() {
  const [product, setProduct] = useState<SpecialProduct>(initialProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<SpecialProduct>(initialProduct);

  const handleEdit = () => {
    setEditData(product);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProduct(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(product);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Management Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          className="h-16 flex-col gap-2 bg-transparent"
          variant="outline"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>
        <Button
          className="h-16 flex-col gap-2 bg-transparent"
          variant="outline"
        >
          <Settings className="w-5 h-5" />
          Manage Subscriptions
        </Button>
        <Button
          className="h-16 flex-col gap-2 bg-transparent"
          variant="outline"
        >
          <Trash2 className="w-5 h-5" />
          Remove Products
        </Button>
      </div>

      {/* Product Card */}
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-3">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-12 h-12 bg-white p-2 rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-red-100 text-sm">{product.description}</p>
              </div>
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              {!isEditing ? (
                <Button onClick={handleEdit} variant="secondary" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button onClick={handleSave} variant="secondary" size="sm">
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
        <CardContent className="p-6">
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Pricing Details</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    <Badge variant="outline" className="capitalize">
                      {product.billing_cycle}
                    </Badge>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">
                    Stripe Integration
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300 font-mono">
                    {product.stripe_price_id}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      4K Ultra HD Quality
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Up to 4 Devices
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Simultaneous Streaming
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Download for Offline
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">
                  Manage Subscription
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={editData.image_url}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        image_url: e.target.value,
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
                  <Label htmlFor="billing_cycle">Billing Cycle</Label>
                  <Input
                    id="billing_cycle"
                    value={editData.billing_cycle}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        billing_cycle: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="stripe_price_id">Stripe Price ID</Label>
                  <Input
                    id="stripe_price_id"
                    value={editData.stripe_price_id}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        stripe_price_id: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductManager;
