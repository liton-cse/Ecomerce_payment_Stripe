import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";
import { publicRoutes, privateRoutes } from "./RouteConfig";

const AppRoutes = () => {
  const { token } = useSelector((state: RootState) => state.loginAuth);

  const routes = token ? privateRoutes : publicRoutes;

  const element = useRoutes(
    routes.map(({ path, element: Element, layout: Layout }) => {
      const page = (
        <Suspense fallback={<div>Loading...</div>}>
          <Element />
        </Suspense>
      );

      return {
        path,
        element: Layout ? (
          <Suspense fallback={<div>Loading layout...</div>}>
            <Layout>{page}</Layout>
          </Suspense>
        ) : (
          page
        ),
      };
    })
  );

  return element;
};

export default AppRoutes;
