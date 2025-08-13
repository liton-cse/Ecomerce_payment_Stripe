// components/ProductModal.tsx
import React from "react";
import type { ProductModalProps } from "../../type/SepcialProduct/spacialProduct.type.js";

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSubscribe,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        <div className="p-6">
          <div className="mb-6">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto max-h-[300px] object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/300x200?text=Product+Image";
              }}
            />
          </div>

          <div className="space-y-4">
            <p className="text-gray-700">{product.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
                <span className="text-sm text-gray-500 ml-1">
                  /{product.billing_cycle}
                </span>
              </span>

              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-2 rounded-lg transition-colors"
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
