import React from "react";
import type { ProductDetailsModalProps } from "../../type/product/product.type.js";
import CardImage from "./CardImage.js";

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg sm:text-xl font-bold">{product.dish}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Image */}
        <CardImage
          image={`${import.meta.env.VITE_IMAGE}/image/${product?.image}`}
          altData={product.dish}
          className="w-full h-48 sm:h-64 object-cover p-2"
        />
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Rating and Price */}
          <div className="flex justify-between items-center">
            <span className="text-yellow-500 font-semibold">
              ⭐ {product.rating}
            </span>
            <span className="text-indigo-600 font-bold text-lg">
              ₹{product.price}
            </span>
          </div>

          {/* Address */}
          <p className="text-gray-600 text-sm sm:text-base">
            {product.address}
          </p>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base">
            {product.description ||
              "This is a delicious dish made with fresh ingredients and crafted with care."}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
