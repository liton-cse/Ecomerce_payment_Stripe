import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const { card } = useSelector((state) => state.cart);

  return (
    <div className="w-full bg-gray-50 text-gray-900 shadow-md px-4 py-3 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl tracking-tight">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors duration-300"
          >
            Ecom<span className="text-indigo-600">Aerce</span>
          </Link>
        </h1>

        <Link
          to={"/card-details"}
          className="relative group p-2 rounded-full hover:bg-gray-100 transition duration-300"
          aria-label="Cart"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600" />
          <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 text-white rounded-full px-1.5 py-0.5">
            {card.length}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
