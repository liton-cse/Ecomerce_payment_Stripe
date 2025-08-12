import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "../../redux/feature/auth/loginSlice.js"; // path to your slice
import type { AppDispatch, RootState } from "../../redux/app/store.js";

const Header = () => {
  const { card } = useSelector((state: RootState) => state.cart);
  const token =
    useSelector((state: RootState) => state.loginAuth.token) ||
    localStorage.getItem("authToken");

  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/");
  };

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
            {!token ? (
              <>
                <Link
                  to="/"
                  className="hover:text-indigo-600 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-indigo-600 transition duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
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
                  to="#"
                  className="hover:text-indigo-600 transition duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            )}
          </nav>

          {/* Cart - Only visible if logged in */}
          {token && (
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
          )}

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
          {!token ? (
            <>
              <Link
                to="/"
                className="block hover:text-indigo-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:text-indigo-600 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
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
                to="#"
                className="block hover:text-indigo-600 transition duration-300"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Link>
              {/* Cart visible in mobile nav as well if needed */}
              <Link
                to="/card-details"
                className="relative group p-2 rounded-full hover:bg-gray-100 transition duration-300"
                aria-label="Cart"
                onClick={() => setMenuOpen(false)}
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600" />
                <span className="absolute -top-1 -right-1 text-xs bg-indigo-600 text-white rounded-full px-1.5 py-0.5">
                  {card.length}
                </span>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
