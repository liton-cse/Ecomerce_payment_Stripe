import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const { card } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gray-50 text-gray-900 shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <h1 className="text-xl font-bold md:text-2xl tracking-tight">
          <Link
            to="/"
            className="hover:text-indigo-600 transition-colors duration-300"
          >
            Ecom<span className="text-indigo-600">Aerce</span>
          </Link>
        </h1>

        {/* Right side: Navigation + Cart + Mobile Menu Button */}
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-indigo-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/special-products"
              className="hover:text-indigo-600 transition duration-300"
            >
              Special Products
            </Link>
            <Link
              to="/logout"
              className="hover:text-indigo-600 transition duration-300"
            >
              Logout
            </Link>
          </nav>

          {/* Cart - Always Visible */}
          <Link
            to="/card-details"
            className="relative group p-2 rounded-full hover:bg-gray-100 transition duration-300"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600" />
            <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 text-white rounded-full px-1.5 py-0.5">
              {card.length}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 shadow-md px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block hover:text-indigo-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/special-products"
            className="block hover:text-indigo-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Special Products
          </Link>
          <Link
            to="/logout"
            className="block hover:text-indigo-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
