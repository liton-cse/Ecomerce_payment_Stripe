import { Plus, Edit, Settings, Users, FileText, ImageIcon } from "lucide-react";
import FoodManager from "../components/product/FoodManager";
import ProductManager from "../components/product/ProductManager";
import ManagementCard from "../components/product/ManagementCard";
import type { RootState } from "@/redux/app/store";
import { useSelector } from "react-redux";
import { actions } from "@/components/product/component/actionArrayButton";
import { userActions } from "@/components/product/component/UserActionButton";

export default function AdminDashboard() {
  const { activeTab } = useSelector((state: RootState) => state.sidebar);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="flex-1 p-6">
        {/* Content Management Section */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ManagementCard
                title="Food Items"
                description="Manage menu items"
                icon={FileText}
                iconColor="text-orange-600"
                iconBg="bg-orange-100 dark:bg-orange-900/20"
                actions={actions}
              />

              <ManagementCard
                title="Media Library"
                description="Manage images & assets"
                icon={ImageIcon}
                iconColor="text-blue-600"
                iconBg="bg-blue-100 dark:bg-blue-900/20"
                actions={[
                  { label: "Upload Media", icon: Plus },
                  { label: "Edit Images", icon: Edit },
                  { label: "Media Settings", icon: Settings },
                ]}
              />

              <ManagementCard
                title="Users"
                description="Manage user accounts"
                icon={Users}
                iconColor="text-green-600"
                iconBg="bg-green-100 dark:bg-green-900/20"
                actions={userActions}
              />
            </div>

            {/* Food Manager */}
            <FoodManager />
          </div>
        )}

        {/* Special Products Section */}
        {activeTab === "special" && (
          <div className="animate-in fade-in duration-500">
            <ProductManager />
          </div>
        )}
      </main>
    </div>
  );
}
