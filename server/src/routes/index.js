import express from "express";

import productRoutes from "../modules/products/product.route.js";

const router = express.Router();

router.use("/products", productRoutes);

export default router;
