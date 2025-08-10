import express from "express";
import { createCheckoutSession } from "./product.controller.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);

export default router;
