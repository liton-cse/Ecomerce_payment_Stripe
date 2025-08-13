import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  let orderId = searchParams.get("orderId");
  const success = searchParams.get("success") === "true";
  const sessionId = searchParams.get("session_id");
  if (success && sessionId && !orderId) {
    orderId = sessionId;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 mt-8">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10 max-w-md sm:max-w-lg md:max-w-xl w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Thank you for your purchase! Your order has been placed and is being
          processed.
        </p>

        {/* Order summary */}
        <div className="mt-6 border-t border-b py-4">
          <p className="text-xs sm:text-sm text-gray-500">
            {success && sessionId ? "Session ID: " : "Order Number: "}
          </p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 break-words">
            {orderId}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            We’ve sent a confirmation email with your order details and tracking
            info.
          </p>
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-indigo-600 text-white px-5 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors text-sm sm:text-base"
        >
          Continue Shopping
        </Link>

        {/* Suggested actions */}
        <div className="mt-8">
          <p className="text-gray-500 text-xs sm:text-sm mb-2">
            You might be interested in:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/category/electronics"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-xs sm:text-sm"
            >
              Electronics
            </Link>
            <Link
              to="/category/fashion"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-xs sm:text-sm"
            >
              Fashion
            </Link>
            <Link
              to="/category/home-decor"
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-xs sm:text-sm"
            >
              Home Decor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
