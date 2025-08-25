import express from 'express';
import * as productController from './product.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { createCheckoutSession } from '../payment/create_session';

const router = express.Router();

// Normal JSON route
router.post('/create-checkout-session', createCheckoutSession);
router.post('/', fileUploadHandler(), productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', fileUploadHandler(), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
export const ProductRoutes = router;
