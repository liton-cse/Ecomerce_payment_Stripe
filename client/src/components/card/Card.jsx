import cardData from "../../cardData/cardData";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/card/cardSlice";
import toast from "react-hot-toast";

function Card() {
  const dispatch = useDispatch();

  const handleAddCard = (item) => {
    dispatch(addToCart(item));
    toast.success("Card is Added!");
  };

  return (
    <div className="grid grid-cols-2 xs:grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3 md:gap-4 lg:gap-5 p-2 sm:p-4">
      {cardData.map((item) => (
        <div
          className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 max-w-sm mx-auto w-full flex flex-col"
          key={item.id}
        >
          {/* Food Image */}
          <img
            src={item.imgdata}
            alt={item.dish}
            className="w-full h-28 xs:h-32 sm:h-36 md:h-40 lg:h-44 object-cover"
          />

          {/* Content */}
          <div className="p-2 xs:p-3 sm:p-4 space-y-1 xs:space-y-2 sm:space-y-3 flex flex-col flex-grow">
            {/* Row 1: Dish name and Rating */}
            <div className="flex items-start justify-between gap-1">
              <h2 className="text-sm xs:text-base sm:text-lg font-bold text-gray-800 leading-tight flex-1 min-w-0">
                <span className="block truncate sm:whitespace-normal">
                  {item.dish}
                </span>
              </h2>
              <div className="text-xs sm:text-sm text-yellow-600 font-semibold whitespace-nowrap ml-1">
                ⭐ {item.rating}
              </div>
            </div>

            {/* Row 2: Address and Price */}
            <div className="flex items-center justify-between gap-1">
              <p className="text-xs sm:text-sm text-gray-500 truncate flex-1 min-w-0">
                {item.address}
              </p>
              <div className="text-sm sm:text-base font-bold text-indigo-600 whitespace-nowrap ml-1">
                ₹{item.price}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-200" />

            {/* Row 3: Bottom Actions */}
            <div className="flex items-center justify-between gap-1 relative mt-auto">
              {/* Left: Arrow Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.arrimg}
                  alt="arrow"
                  className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6"
                />
              </div>

              {/* Center: Add to Cart Button with Tooltip */}
              <div className="relative group flex-1 flex justify-center">
                <button
                  className="bg-indigo-500 text-white text-xs sm:text-sm px-2 xs:px-3 py-1 xs:py-1.5 rounded hover:bg-indigo-700 transition w-full max-w-24 xs:max-w-28 sm:max-w-32 text-center"
                  onClick={() => handleAddCard(item)}
                >
                  <span className="hidden xs:inline">Add to Cart</span>
                  <span className="xs:hidden">Add</span>
                </button>
                {/* Tooltip - only show on larger screens */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 shadow-lg pointer-events-none hidden sm:block">
                  Add this item to your cart
                </div>
              </div>

              {/* Right: Delivery Image with Tooltip */}
              <div className="relative group flex-shrink-0">
                <img
                  src={item.delimg}
                  alt="delivery"
                  className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
