import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import AddProduct from "./component/SubscriptionForm";
import { motion, AnimatePresence } from "framer-motion";
import type { subscriptionProduct } from "@/type/product/product.type";
import {
  consumeSubscribeRefresher,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/redux/features/product/subscriptionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/app/store";

function ProductManager() {
  const { products, loading, refresher } = useAppSelector(
    (state) => state.subscribe
  );
  const [showForm, setShowForm] = useState(false);
  const [subscribeProduct, setSubscribeProduct] = useState<
    subscriptionProduct[]
  >([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editData, setEditData] = useState<subscriptionProduct | null>(null);
  const [showStripeId, setShowStripeId] = useState<Record<string, boolean>>({});
  const [copiedField, setCopiedField] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setSubscribeProduct(products);
  }, [products, dispatch]);
  useEffect(() => {
    if (refresher) {
      dispatch(fetchProducts());
      dispatch(consumeSubscribeRefresher());
    }
  }, [refresher, dispatch]);

  const handleEdit = (_id: string) => {
    const found = subscribeProduct.find((d) => d._id === _id) || null;
    setEditData(found);
    setEditingProductId(_id);
    setImageFile(null);
    setPreviewImage(null);
  };

  const handleSave = async () => {
    if (editData?._id) {
      try {
        // Create FormData for the update
        const formData = new FormData();
        formData.append("name", editData.name || "");
        formData.append("description", editData.description || "");
        formData.append("price", String(editData.price || 0));
        formData.append("billing_cycle", editData.billing_cycle || "monthly");
        formData.append("stripe_price_id", editData.stripe_price_id || "");

        // If there's an image URL, append it
        // Only append image if there's a new file
        if (imageFile) {
          formData.append("image", imageFile);
        }

        await dispatch(updateProduct({ id: editData._id, formData }));
        setImageFile(null);
        setEditingProductId(null);
        setEditData(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setEditData(null);
    setImageFile(null);
    setPreviewImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      // Confirm delete action
      if (!window.confirm("Are you sure you want to delete this dish?")) {
        return;
      }
      // Make sure we're passing the ID correctly
      const result = await dispatch(deleteProduct(productId));
      // Only update local state after successful deletion
      if (deleteProduct.fulfilled.match(result)) {
        setSubscribeProduct((prev) =>
          prev.filter((product) => product._id !== productId)
        );
        setEditData(null);
        setImageFile(null);
      } else {
        console.error("Delete failed:", result);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getBillingCycleColor = (cycle: string) => {
    const colors = {
      monthly:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      yearly:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      weekly:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    };
    return (
      colors[cycle.toLowerCase() as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  const toggleStripeVisibility = (productId: string) => {
    setShowStripeId((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#4B5563"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Management Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Button
            className="h-16 flex-col gap-2 bg-transparent text-white"
            variant="outline"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <Plus className="w-5 h-5 text-white" />
            Add New Product
          </Button>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <AddProduct setShowForm={setShowForm} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Products List */}
      {subscribeProduct.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No products found. Add your first product!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {subscribeProduct.map((product) => {
            const isEditing = editingProductId === product._id;
            const currentEditData = isEditing ? editData : product;

            return (
              <div key={product._id}>
                {isEditing ? (
                  // Edit Mode Card
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Edit Subscription
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleSave()}
                            className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="inline-flex items-center px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white border-gray-500 hover:border-gray-600 text-sm font-medium rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Product Name
                            </Label>
                            <Input
                              value={currentEditData?.name || ""}
                              onChange={(e) =>
                                setEditData((prev) =>
                                  prev
                                    ? { ...prev, name: e.target.value }
                                    : null
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                          </div>

                          <div>
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Description
                            </Label>
                            <Textarea
                              value={currentEditData?.description || ""}
                              onChange={(e) =>
                                setEditData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        description: e.target.value,
                                      }
                                    : null
                                )
                              }
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                            />
                          </div>

                          <div>
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Image
                            </Label>
                            <div className="space-y-3">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              />
                              {/* Image Preview */}
                              {(previewImage || currentEditData?.image) && (
                                <div className="mt-2">
                                  <img
                                    src={
                                      previewImage ||
                                      `${
                                        import.meta.env.VITE_IMAGE_URL
                                      }/image/${currentEditData?.image}`
                                    }
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "/placeholder.svg";
                                    }}
                                  />
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {previewImage
                                      ? "New image selected"
                                      : "Current image"}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Price (₹)
                              </Label>
                              <Input
                                type="number"
                                value={currentEditData?.price || 0}
                                onChange={(e) =>
                                  setEditData((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          price: Number(e.target.value),
                                        }
                                      : null
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                              />
                            </div>

                            <div>
                              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Billing Cycle
                              </Label>
                              <select
                                value={
                                  currentEditData?.billing_cycle || "monthly"
                                }
                                onChange={(e) =>
                                  setEditData((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          billing_cycle: e.target.value as
                                            | "monthly"
                                            | "yearly",
                                        }
                                      : null
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                <option value="weekly">Weekly</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Stripe Price ID
                            </Label>
                            <Input
                              type="text"
                              value={currentEditData?.stripe_price_id || ""}
                              onChange={(e) =>
                                setEditData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        stripe_price_id: e.target.value,
                                      }
                                    : null
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Display Mode Card
                  <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>

                    {/* Header */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative">
                            <img
                              src={`${import.meta.env.VITE_IMAGE_URL}/image/${
                                product.image
                              }`}
                              alt={product.name}
                              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 dark:border-gray-800 shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.svg";
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => handleEdit(product._id)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                            title="Edit subscription"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                            title="Delete subscription"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Pricing Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Price
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getBillingCycleColor(
                                product.billing_cycle || "monthly"
                              )}`}
                            >
                              {product.billing_cycle}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                            {formatCurrency(product.price || 0)}
                          </div>
                        </div>

                        {/* Stripe Integration */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                              Stripe ID
                            </span>
                            <button
                              onClick={() =>
                                toggleStripeVisibility(product._id)
                              }
                              className="p-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                            >
                              {showStripeId[product._id] ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="text-sm font-mono text-purple-900 dark:text-purple-100 flex-1 truncate">
                              {showStripeId[product._id]
                                ? product.stripe_price_id || "N/A"
                                : "••••••••••••••••"}
                            </code>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  product.stripe_price_id || "",
                                  `stripe-${product._id}`
                                )
                              }
                              className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-100 dark:hover:bg-purple-800/30 rounded transition-all duration-200"
                              title="Copy Stripe ID"
                            >
                              {copiedField === `stripe-${product._id}` ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View in Stripe
                        </button>
                        <button className="inline-flex items-center justify-center px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                          Manage Users
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductManager;
