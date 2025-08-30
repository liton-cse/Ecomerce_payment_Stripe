import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../utils/axios.js";
import {
  addToCart,
  removeFromCart,
  removeSingleItem,
  emptyCart,
} from "../../redux/feature/card/cardSlice.js";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../redux/app/store.js"; // ✅ Typed hooks
import type { CartItem } from "../../type/product/product.type.js";
import { getFcmToken } from "../../redux/feature/fcmToken/fcmTokenSlice.js";
import { ClipLoader } from "react-spinners";

const AddToCard: React.FC = () => {
  const { cartItem, loading } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [totalprice, setPrice] = useState<number>(0);
  const [totalquantity, setTotalQuantity] = useState<number>(0);
  const dispatch = useAppDispatch(); // ✅ Now typed
  const handleIncrement = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (id: CartItem["_id"]) => {
    dispatch(removeFromCart(id));
    (toast as any).success("Item Removed From Your Cart");
  };

  const handleSingleDecrement = (item: CartItem) => {
    dispatch(removeSingleItem(item));
  };

  const emptycart = () => {
    dispatch(emptyCart());
    (toast as any).success("Your Cart is Empty");
  };

  const total = useCallback(() => {
    let totalprice = 0;
    cartItem.forEach((ele: CartItem) => {
      totalprice += ele.price * ele.qnty;
    });
    setPrice(totalprice);
  }, [cartItem]);

  const countquantity = useCallback(() => {
    let totalquantity = 0;
    cartItem.forEach((ele: CartItem) => {
      totalquantity += ele.qnty;
    });
    setTotalQuantity(totalquantity);
  }, [cartItem]);

  useEffect(() => {
    total();
    countquantity();
  }, [total, countquantity]);

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }
    const token = await dispatch(getFcmToken()).unwrap();
    try {
      const { data: session } = await axiosInstance.post<{ id: string }>(
        "/products/create-checkout-session",
        { products: cartItem, token }
      );

      if (!session.id) {
        throw new Error("Session ID not returned from backend.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error("Stripe redirection error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 mt-14 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-800 p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-semibold">
                Cart Calculation
                {cartItem.length > 0 ? `(${cartItem.length})` : ""}
              </h2>
              {cartItem.length > 0 && (
                <button
                  onClick={emptycart}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm flex items-center ml-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Empty Cart
                </button>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {cartItem.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Your Cart Is Empty
                </h3>
                <p className="text-gray-500">
                  Start shopping to add items to your cart
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartItem.map((data: CartItem, index: number) => (
                        <tr key={index}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDecrement(data._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={`${import.meta.env.VITE_IMAGE}/image/${
                                  data?.image
                                }`}
                                alt={data.dish}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {data.dish}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{data.price}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={
                                  data.qnty <= 1
                                    ? () => handleDecrement(data._id)
                                    : () => handleSingleDecrement(data)
                                }
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="bg-gray-100 px-3 py-1 text-center border-t border-b border-gray-300">
                                {data.qnty}
                              </span>
                              <button
                                onClick={() => handleIncrement(data)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            ₹{data.qnty * data.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-600">
                        Items In Cart:
                        <span className="font-medium text-red-600 ml-1">
                          {totalquantity}
                        </span>
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-600">
                        Total Price:
                        <span className="font-medium text-red-600 ml-1">
                          ₹{totalprice}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full sm:hidden space-x-4">
                      <p className="text-sm text-gray-600">
                        Total Price:
                        <span className="font-medium text-red-600 ml-1">
                          ₹{totalprice}
                        </span>
                      </p>
                      <button
                        onClick={makePayment}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md text-sm font-medium"
                      >
                        Checkout
                      </button>
                    </div>
                    <div className="hidden sm:block">
                      <button
                        onClick={makePayment}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md text-sm font-medium"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCard;
