import express from 'express';
import * as productController from './product.controller';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

// Normal JSON route
router.post(
  '/create-checkout-session',
  productController.createCheckoutSession
);
router.post('/', fileUploadHandler(), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', fileUploadHandler(), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
export const ProductRoutes = router;
