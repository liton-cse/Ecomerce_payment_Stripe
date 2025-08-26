import React from "react";
import AsideMenu from "@/components/header/AsideMenu";
import Header from "@/components/header/Header";
import type { AppDispatch, RootState } from "@/redux/app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setActiveTab,
} from "@/redux/features/product/asideSlice";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarOpen, activeTab } = useSelector(
    (state: RootState) => state.sidebar
  );

  const handleTabChange = (tab: "home" | "special") => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <AsideMenu
        activeTab={activeTab}
        sidebarOpen={sidebarOpen}
        onHomeClick={() => handleTabChange("home")}
        onSpecialClick={() => handleTabChange("special")}
        onToggleSidebar={() => dispatch(toggleSidebar())}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Header with nav inside */}
        <Header
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => dispatch(toggleSidebar())}
        />

        {/* Main content */}
        <main className="flex-1 rounded-t-xl shadow-inner">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
    </div>
  );
};

export default MainLayout;
