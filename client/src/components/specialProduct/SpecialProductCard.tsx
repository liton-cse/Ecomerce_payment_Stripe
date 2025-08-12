import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import type { SpecialProductCardProps } from "../../type/SepcialProduct/spacialProduct.type.js";
import ProductModal from "./SpecialProductModal.js";

const SpecialProductCard: React.FC<SpecialProductCardProps> = ({
  product,
  stripePublicKey,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getBillingCycleText = (cycle: string) => {
    const cycleMap: Record<string, string> = {
      monthly: "/month",
      yearly: "/year",
      weekly: "/week",
    };
    return cycleMap[cycle] || "";
  };

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    if (!product.stripe_price_id) return;

    setIsLoading(true);

    try {
      const stripe = await loadStripe(stripePublicKey);
      if (!stripe) throw new Error("Stripe failed to initialize");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: product.stripe_price_id,
          productName: product.name,
          billingCycle: product.billing_cycle,
          returnUrl: window.location.href,
        }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const { id: sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) throw result.error;
    } catch (error) {
      console.error("Checkout error:", error);
      // Consider adding user feedback here (toast, alert, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100 relative">
      {/* Image Container */}
      <div
        className="relative pt-[56.25%] bg-gray-50 overflow-hidden cursor-pointer"
        onClick={handleImageClick}
        aria-label={`View details for ${product.name}`}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/placeholder-product.png";
          }}
        />
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and CTA */}
        <div className="mt-4">
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-gray-500 ml-1">
              {getBillingCycleText(product.billing_cycle)}
            </span>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={!product.stripe_price_id || isLoading}
            className={`w-full py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center ${
              product.stripe_price_id
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            aria-label={`Subscribe to ${product.name} for ${formatPrice(
              product.price
            )}${getBillingCycleText(product.billing_cycle)}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : product.stripe_price_id ? (
              "Subscribe Now"
            ) : (
              "Coming Soon"
            )}
          </button>
        </div>
      </div>

      {/* Billing cycle badge */}
      <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-1 rounded-full capitalize">
        {product.billing_cycle}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onSubscribe={handleSubscribe}
          isSubscribing={isLoading}
        />
      )}
    </div>
  );
};

export default SpecialProductCard;
