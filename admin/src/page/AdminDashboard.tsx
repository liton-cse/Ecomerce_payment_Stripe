"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Home,
  Package,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Settings,
  Users,
  FileText,
  ImageIcon,
} from "lucide-react";
import FoodManager from "../components/product/FoodManager";
import ProductManager from "../components/product/ProductManager";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-700 z-50 transform transition-transform duration-300 ease-in-out">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === "home"
                ? "bg-blue-500 text-white shadow-lg transform scale-105"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Content Management</span>
          </button>

          <button
            onClick={() => setActiveTab("special")}
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

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                {activeTab === "home"
                  ? "Content Management"
                  : "Special Products Management"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {activeTab === "home"
                  ? "Manage your website content, food items, and media"
                  : "Manage premium subscription services and products"}
              </p>
            </div>
            <Avatar className="w-12 h-12 ring-2 ring-blue-500 ring-offset-2">
              <AvatarImage src="/admin-avatar.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content Management Section */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Management Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Food Items Management */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      Food Items
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Manage menu items
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Item
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Items
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Items
                  </Button>
                </div>
              </div>

              {/* Media Management */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      Media Library
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Manage images & assets
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Media
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Images
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Media Settings
                  </Button>
                </div>
              </div>

              {/* User Management */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      Users
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Manage user accounts
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Users
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    User Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Food Manager Component */}
            <FoodManager />
          </div>
        )}

        {/* Special Products Management Section */}
        {activeTab === "special" && (
          <div className="animate-in fade-in duration-500">
            <ProductManager />
          </div>
        )}
      </div>
    </div>
  );
}
