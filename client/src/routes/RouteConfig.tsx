// routes.ts
import { lazy } from "react";
import { type AppRoute } from "./routeTypes";

const Login = lazy(() => import("../components/auth/Login"));
const ForgetPassword = lazy(() => import("../components/auth/ForgetPassword"));
const VerifyEmail = lazy(() => import("../components/auth/VerifyEmail"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const Home = lazy(() => import("../page/Home/Home"));
const AddToCard = lazy(() => import("../components/card/AddToCard"));
const Success = lazy(() => import("../page/sucess/Success"));
const Cancel = lazy(() => import("../page/sucess/Cencel"));
const MainLayout = lazy(() => import("../layouts/MainLayouts"));

export const publicRoutes: AppRoute[] = [
  { path: "/", element: Login, layout: MainLayout },
  { path: "/forget-password", element: ForgetPassword, layout: MainLayout },
  { path: "/verify-otp", element: VerifyEmail, layout: MainLayout },
  { path: "/reset-password", element: ResetPassword, layout: MainLayout },
];

export const privateRoutes: AppRoute[] = [
  { path: "/", element: Home, layout: MainLayout },
  { path: "/card-details", element: AddToCard, layout: MainLayout },
  { path: "/success", element: Success, layout: MainLayout },
  { path: "/cencel", element: Cancel, layout: MainLayout },
];
