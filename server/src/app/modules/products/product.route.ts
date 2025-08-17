import express from 'express';

import { createCheckoutSession } from './product.controller';

const router = express.Router();

// Normal JSON route
router.post('/create-checkout-session', createCheckoutSession);

export const ProductRoutes = router;
