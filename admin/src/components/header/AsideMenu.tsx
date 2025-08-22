import { Home, Package, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/redux/app/store";
import { logout as logoutAction } from "@/redux/features/auth/loginSlice";
import { toggleSidebar } from "@/redux/features/product/asideSlice";

interface AsideMenuProps {
  activeTab: string;
  sidebarOpen: boolean;
  onHomeClick: () => void;
  onSpecialClick: () => void;
  onToggleSidebar: () => void;
}

const AsideMenu: React.FC<AsideMenuProps> = ({
  activeTab,
  sidebarOpen,
  onHomeClick,
  onSpecialClick,
  onToggleSidebar,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(toggleSidebar());
    navigate("/");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-700 z-50
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
        `}
      >
        {/* Logo / Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 hidden md:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          <button
            onClick={onHomeClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "home"
                ? "bg-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>

          <button
            onClick={onSpecialClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "special"
                ? "bg-purple-500 text-white shadow-lg transform scale-105"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">Special Products</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggleSidebar}
        />
      )}
    </>
  );
};

export default AsideMenu;
