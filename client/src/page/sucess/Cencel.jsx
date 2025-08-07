import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Cancelled ❌
        </h1>
        <p className="text-gray-600 mt-2">
          We're sorry, your payment could not be processed due to an internal
          issue or cancellation.
        </p>

        {/* Troubleshooting Message */}
        <div className="mt-6 border-t border-b py-4 text-sm text-gray-500">
          <p>If funds were deducted, they will be refunded automatically.</p>
          <p className="mt-2">For assistance, contact litonakash13@gmail.com</p>
        </div>

        {/* Retry / Back Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Link
            to="/checkout"
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
          >
            Try Again
          </Link> */}
          <Link
            to="/"
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Suggested Links */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-2">Need something else?</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/category/support"
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
            >
              Customer Support
            </Link>
            <Link
              to="/faq"
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
