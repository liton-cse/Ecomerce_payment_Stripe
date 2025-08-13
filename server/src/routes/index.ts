import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ProductRoutes } from '../app/modules/products/product.route';
import { SpacialProduct } from '../app/modules/special_product/specialProduct.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/special/products',
    route: SpacialProduct,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
