import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/redux/app/store";
import { fetchUserProfile } from "@/redux/features/auth/loginSlice";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { type UserData } from "@/type/auth/auth.type";

type HeaderProps = {
  activeTab: string;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

function Header({ activeTab, sidebarOpen, toggleSidebar }: HeaderProps) {
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<UserData | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await dispatch(fetchUserProfile()).unwrap();
      console.log();
      setItem(result);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      {/* Mobile / Tablet Top Bar */}
      <div className="flex items-center justify-between md:hidden p-4 bg-white dark:bg-slate-900 shadow mb-4">
        <button onClick={toggleSidebar} className="p-2 rounded-md">
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>

        <Avatar className="w-10 h-10 ring-2 ring-blue-500 ring-offset-2">
          <AvatarImage src="./admin-avatar.png" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>

      {/* Desktop Top Bar */}
      <div className="hidden md:flex items-center justify-between p-4 bg-white dark:bg-slate-900 shadow mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            {activeTab === "home"
              ? "Product Management"
              : "Subscription Products Management"}
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
            {activeTab === "home"
              ? "Manage your website content, food items, and media"
              : "Manage premium subscription services and products"}
          </p>
        </div>

        <Avatar className="w-10 h-10 ring-2 ring-blue-500 ring-offset-2">
          <AvatarImage src="/admin-avatar.png" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
