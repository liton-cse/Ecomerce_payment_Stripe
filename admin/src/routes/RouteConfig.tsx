// routes.ts
import { lazy } from "react";
import { type AppRoute } from "./routeTypes.js";

const Login = lazy(() => import("../components/auth/Login.js"));
const AdminDashboard = lazy(() => import("../page/AdminDashboard.js"));
const MainLayout = lazy(() => import("../layouts/MainLayoutes.js"));

export const publicRoutes: AppRoute[] = [
  { path: "/", element: Login, layout: MainLayout },
];

export const privateRoutes: AppRoute[] = [
  { path: "/", element: AdminDashboard, layout: MainLayout },
];
