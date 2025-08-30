// components/ProductModal.tsx
import React from "react";
import type { ProductModalProps } from "../../type/SepcialProduct/spacialProduct.type.js";

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSubscribe,
}) => {
  const getShortDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return description;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl sm:text-2xl font-bold">{product.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-7 sm:w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col sm:flex-row sm:gap-6">
          {/* Image */}
          <div className="flex-shrink-0 w-full sm:w-1/2 mb-4 sm:mb-0">
            <img
              src={`${import.meta.env.VITE_IMAGE}/image/${product?.image}`}
              alt={product.name}
              className="w-full h-56 sm:h-full min-h-[200px] object-contain rounded-lg"
              style={{ flexShrink: 0 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x200?text=Product+Image";
              }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 space-y-4">
            <p className="text-gray-700">
              {getShortDescription(product.description)}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
              <span className="text-2xl sm:text-3xl font-bold text-indigo-600 flex-1">
                ${product.price.toFixed(2)}
                <span className="text-sm text-gray-500 ml-1">
                  /{product.billing_cycle}
                </span>
              </span>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto flex-shrink-0"
                onClick={(e) => onSubscribe(e, product)}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
