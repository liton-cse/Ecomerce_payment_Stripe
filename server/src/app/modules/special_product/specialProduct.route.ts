import express from 'express';
import { createCheckoutSession } from './specialProduct.contrller';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);

export const SpacialProduct = router;
