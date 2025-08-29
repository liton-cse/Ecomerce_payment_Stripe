import type { FooterConfig } from "./footer.type.js";
// Default Configuration
export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  company: {
    name: "FoodHub",
    tagline: "Premium Food Delivery",
    description:
      "Delivering fresh, delicious meals right to your doorstep. Experience the finest culinary journey with our premium food delivery service.",
    logo: "🍴",
  },
  contact: {
    address: "123 Food Street, Culinary City, CC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@foodhub.com",
    hours: "Mon-Sun: 9:00 AM - 11:00 PM",
  },
  links: {
    quick: [
      "Home",
      "Menu",
      "About Us",
      "Contact",
      "Track Order",
      "Careers",
      "Gift Cards",
    ],
    categories: [
      "Pizza & Italian",
      "Burgers & Fast Food",
      "Asian Cuisine",
      "Healthy Options",
      "Desserts",
      "Beverages",
      "Breakfast",
      "Vegan Options",
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
  social: [
    {
      name: "Facebook",
      icon: "📘",
      href: "#facebook",
      color: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      icon: "🐦",
      href: "#twitter",
      color: "hover:bg-sky-500",
    },
    {
      name: "Instagram",
      icon: "📷",
      href: "#instagram",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    },
    {
      name: "YouTube",
      icon: "📹",
      href: "#youtube",
      color: "hover:bg-red-600",
    },
  ],
  payments: ["VISA", "MC", "AMEX", "PayPal", "GPay", "Apple"],
  features: [
    { icon: "🚚", title: "Free Delivery", subtitle: "On orders over $30" },
    { icon: "⚡", title: "Fast Delivery", subtitle: "30-45 minutes" },
    { icon: "🎯", title: "Live Tracking", subtitle: "Track your order" },
  ],
  animations: {
    floatingIcons: ["🍕", "🍔", "🍜", "🥗", "🍰", "🥤"],
    delays: {
      sections: [100, 200, 300, 400],
      social: [0, 100, 200, 300],
    },
  },
};
