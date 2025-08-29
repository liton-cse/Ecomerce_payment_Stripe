// routes.ts
import { lazy } from "react";
import { type AppRoute } from "./routeTypes.js";

const Login = lazy(() => import("../components/auth/Login.js"));
const ForgetPassword = lazy(
  () => import("../components/auth/ForgetPassword.js")
);
const VerifyEmail = lazy(() => import("../components/auth/VerifyEmail.js"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword.js"));
const Home = lazy(() => import("../page/Home/Home.js"));
const AddToCard = lazy(() => import("../components/card/AddToCard.js"));
const SpecialProduct = lazy(
  () => import("../components/specialProduct/SpacialProductRender.js")
);
const Success = lazy(() => import("../page/sucess/Success.js"));
const Cancel = lazy(() => import("../page/sucess/Cencel.js"));
const MainLayout = lazy(() => import("../layouts/MainLayouts.js"));

export const publicRoutes: AppRoute[] = [
  { path: "/", element: Login, layout: MainLayout },
  { path: "/forget-password", element: ForgetPassword, layout: MainLayout },
  { path: "/verify-otp", element: VerifyEmail, layout: MainLayout },
  { path: "/reset-password", element: ResetPassword, layout: MainLayout },
];

export const privateRoutes: AppRoute[] = [
  { path: "/", element: Home, layout: MainLayout },
  { path: "/card-details", element: AddToCard, layout: MainLayout },
  {
    path: "/special-products",
    element: SpecialProduct,
    layout: MainLayout,
  },
  { path: "/success", element: Success, layout: MainLayout },
  { path: "/cencel", element: Cancel, layout: MainLayout },
];
