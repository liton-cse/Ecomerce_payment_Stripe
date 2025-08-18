import "./App.css";
import AdminDashboard from "./page/AdminDashbord";

function App() {
  return (
    <>
      <div>
        <AdminDashboard />
      </div>
    </>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import {
//   Home,
//   Star,
//   Package,
//   LogOut,
//   Menu,
//   X,
//   TrendingUp,
//   Users,
//   DollarSign,
//   ShoppingCart,
// } from "lucide-react";

// interface FoodItem {
//   id: number;
//   dish: string;
//   imgdata: string;
//   address: string;
//   delimg: string;
//   somedata: string;
//   price: number;
//   rating: string;
//   arrimg: string;
//   qnty: number;
// }

// interface SpecialProduct {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   billing_cycle: string;
//   image_url: string;
//   stripe_price_id: string;
// }

// const AdminDashboard: React.FC = () => {
//   const [activeSection, setActiveSection] = useState<"home" | "special">(
//     "home"
//   );
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [animatedCards, setAnimatedCards] = useState<number[]>([]);

//   const foodItems: FoodItem[] = [
//     {
//       id: 1,
//       dish: "Punjabi",
//       imgdata:
//         "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
//       address: "North Indian, Biryani, Mughlai",
//       delimg:
//         "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
//       somedata: "1175 + order placed from here recently",
//       price: 350,
//       rating: "3.8",
//       arrimg:
//         "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
//       qnty: 0,
//     },
//     {
//       id: 2,
//       dish: "South Indian Deluxe",
//       imgdata:
//         "https://images.unsplash.com/photo-1630409346755-1dcf7c0c68bd?w=400&h=300&fit=crop",
//       address: "South Indian, Dosa, Idli, Vada",
//       delimg:
//         "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
//       somedata: "890 + orders placed from here recently",
//       price: 280,
//       rating: "4.2",
//       arrimg:
//         "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
//       qnty: 0,
//     },
//     {
//       id: 3,
//       dish: "Chinese Special",
//       imgdata:
//         "https://images.unsplash.com/photo-1563379091339-03246963d5d6?w=400&h=300&fit=crop",
//       address: "Chinese, Noodles, Fried Rice",
//       delimg:
//         "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
//       somedata: "654 + orders placed from here recently",
//       price: 420,
//       rating: "4.0",
//       arrimg:
//         "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
//       qnty: 0,
//     },
//   ];

//   const specialProducts: SpecialProduct[] = [
//     {
//       id: 1,
//       name: "Netflix Premium",
//       description: "4K Ultra HD streaming on up to 4 devices simultaneously",
//       price: 100,
//       billing_cycle: "monthly",
//       image_url: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
//       stripe_price_id: "price_1RvMbRLYjp5zK6UojQQZ6Bbi",
//     },
//     {
//       id: 2,
//       name: "Spotify Premium",
//       description: "Ad-free music streaming with offline downloads",
//       price: 80,
//       billing_cycle: "monthly",
//       image_url: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
//       stripe_price_id: "price_spotify_premium",
//     },
//     {
//       id: 3,
//       name: "Adobe Creative Suite",
//       description: "Complete creative tools for professionals",
//       price: 250,
//       billing_cycle: "monthly",
//       image_url: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
//       stripe_price_id: "price_adobe_creative",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomId = Math.floor(Math.random() * 3) + 1;
//       setAnimatedCards((prev) => [...prev, randomId]);
//       setTimeout(() => {
//         setAnimatedCards((prev) => prev.filter((id) => id !== randomId));
//       }, 1000);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const StatCard: React.FC<{
//     title: string;
//     value: string;
//     icon: React.ReactNode;
//     color: string;
//   }> = ({ title, value, icon, color }) => (
//     <div
//       className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-600 text-sm font-medium">{title}</p>
//           <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
//         </div>
//         <div
//           className={`p-3 rounded-full bg-opacity-20 ${color.replace(
//             "border-l-",
//             "bg-"
//           )}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );

//   const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
//     const isAnimated = animatedCards.includes(item.id);

//     return (
//       <div
//         className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
//           isAnimated ? "animate-pulse ring-4 ring-blue-400" : ""
//         }`}
//       >
//         <div className="relative">
//           <img
//             src={item.imgdata}
//             alt={item.dish}
//             className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
//           />
//           <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
//             <Star className="w-4 h-4 text-yellow-500 fill-current" />
//             <span className="font-semibold text-sm">{item.rating}</span>
//           </div>
//           <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//             ₹{item.price}
//           </div>
//         </div>

//         <div className="p-6">
//           <h3 className="font-bold text-xl text-gray-800 mb-2">{item.dish}</h3>
//           <p className="text-gray-600 mb-3">{item.address}</p>

//           <div className="flex items-center gap-2 mb-4">
//             <img src={item.delimg} alt="delivery" className="w-5 h-5" />
//             <p className="text-sm text-gray-500">{item.somedata}</p>
//           </div>

//           <div className="flex justify-between items-center">
//             <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
//               Order Now
//             </button>
//             <img src={item.arrimg} alt="arrow" className="w-5 h-5" />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ProductCard: React.FC<{ product: SpecialProduct }> = ({ product }) => (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-purple-300">
//       <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-6">
//         <img
//           src={product.image_url}
//           alt={product.name}
//           className="w-16 h-16 mx-auto mb-4 filter brightness-0 invert"
//         />
//         <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
//           <span className="text-white text-xs font-medium uppercase">
//             {product.billing_cycle}
//           </span>
//         </div>
//       </div>

//       <div className="p-6">
//         <h3 className="font-bold text-xl text-gray-800 mb-2">{product.name}</h3>
//         <p className="text-gray-600 mb-4 leading-relaxed">
//           {product.description}
//         </p>

//         <div className="flex justify-between items-center mb-4">
//           <div className="text-3xl font-bold text-purple-600">
//             ₹{product.price}
//             <span className="text-sm font-normal text-gray-500">
//               /{product.billing_cycle}
//             </span>
//           </div>
//         </div>

//         <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
//           Subscribe Now
//         </button>

//         <p className="text-xs text-gray-400 mt-2 text-center">
//           ID: {product.stripe_price_id}
//         </p>
//       </div>
//     </div>
//   );

//   const sidebarItems = [
//     { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
//     {
//       id: "special",
//       label: "Special Products",
//       icon: <Package className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Mobile Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Admin Panel
//             </h1>
//             <button
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <nav className="p-4 space-y-2">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setActiveSection(item.id as "home" | "special");
//                 setIsSidebarOpen(false);
//               }}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
//                 activeSection === item.id
//                   ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {item.icon}
//               <span className="font-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="absolute bottom-4 left-4 right-4">
//           <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
//             <LogOut className="w-5 h-5" />
//             <span className="font-medium">Log Out</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="lg:ml-64 min-h-screen">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
//           <div className="flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-4">
//               <button
//                 className="lg:hidden text-gray-600 hover:text-gray-800"
//                 onClick={() => setIsSidebarOpen(true)}
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-800 capitalize">
//                 {activeSection === "home"
//                   ? "Dashboard Overview"
//                   : "Special Products"}
//               </h2>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium">Online</span>
//               </div>

//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                 A
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="p-6">
//           {activeSection === "home" && (
//             <div className="space-y-8">
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <StatCard
//                   title="Total Revenue"
//                   value="₹45,678"
//                   icon={<DollarSign className="w-6 h-6 text-green-600" />}
//                   color="border-l-green-500"
//                 />
//                 <StatCard
//                   title="Total Orders"
//                   value="2,845"
//                   icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
//                   color="border-l-blue-500"
//                 />
//                 <StatCard
//                   title="Active Users"
//                   value="1,234"
//                   icon={<Users className="w-6 h-6 text-purple-600" />}
//                   color="border-l-purple-500"
//                 />
//                 <StatCard
//                   title="Growth Rate"
//                   value="+15.3%"
//                   icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
//                   color="border-l-orange-500"
//                 />
//               </div>

//               {/* Food Items */}
//               <div>
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-2xl font-bold text-gray-800">
//                     Popular Food Items
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
//                     Live Orders
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {foodItems.map((item) => (
//                     <FoodCard key={item.id} item={item} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeSection === "special" && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   Premium Subscriptions
//                 </h3>
//                 <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
//                   Add New Product
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {specialProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
