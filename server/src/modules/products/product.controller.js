import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);
import { v4 as uuidv4 } from "uuid";

/**
 * @desc Create Stripe Checkout Session
 * @route POST /api/products/create-checkout-session
 */
export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required." });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.dish,
          images: [product.imgdata],
        },
        unit_amount: product.price * 100, // convert to smallest currency unit
      },
      quantity: product.qnty,
    }));

    // 1️⃣ Generate a unique order ID
    const id = uuidv4();
    const generatedOrderId = id.slice(6);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?orderId=${generatedOrderId}`,
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ message: "Failed to create checkout session." });
  }
};
