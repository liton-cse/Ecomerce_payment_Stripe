import { lazy } from "react";
import { type AppRoute } from "./routeTypes";

const Login = lazy(() => import("../components/auth/Login"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const ChangePassword = lazy(() => import("../components/auth/ChangePassword"));
const Home = lazy(() => import("../page/Home/Home"));
const AddToCard = lazy(() => import("../components/card/AddToCard"));
const Success = lazy(() => import("../page/sucess/Success"));
const Cencel = lazy(() => import("../page/sucess/Cencel"));

const MainLayout = lazy(() => import("../layouts/MainLayouts"));

export const routes: AppRoute[] = [
  {
    path: "/",
    element: Home,
    layout: MainLayout,
  },
  {
    path: "/login",
    element: Login,
    layout: MainLayout,
  },
  {
    path: "/reset-password",
    element: ResetPassword,
    layout: MainLayout,
  },
  {
    path: "/change-password",
    element: ChangePassword,
    layout: MainLayout,
  },
  {
    path: "/card-details",
    element: AddToCard,
    layout: MainLayout,
  },
  {
    path: "/success",
    element: Success,
    layout: MainLayout,
  },
  {
    path: "/cencel",
    element: Cencel,
    layout: MainLayout,
  },

  //   {
  //     path: "*",
  //     element: NotFound,
  //     layout: null,
  //   },
];
