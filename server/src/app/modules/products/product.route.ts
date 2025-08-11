import express from 'express';
import { createCheckoutSession } from './product.controller';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

export const ProductRoutes = router;
