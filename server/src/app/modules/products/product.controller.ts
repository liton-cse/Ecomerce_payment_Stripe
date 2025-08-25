import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';
import type { IProduct } from './product.interface';
import * as productService from './product.service';
import catchAsync from '../../../shared/catchAsync';

// export const createCheckoutSession = async (
//   req: Request<unknown, unknown, CheckoutRequestBody>,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { products, token } = req.body;
//     if (!products || !Array.isArray(products) || products.length === 0) {
//       res.status(400).json({ message: 'Products array is required.' });
//       return;
//     }
//     if (!token) {
//       res.status(400).json({ message: 'Token is required.' });
//       return;
//     }

//     const lineItems = products.map(product => ({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: 'dish' in product ? product.dish : product.productName,
//           images: ['image' in product ? product.image : product.image_url],
//         },
//         unit_amount: Math.round(
//           (('price' in product ? product.price : product.sub_price) ?? 0) * 100
//         ),
//       },
//       quantity: 'qnty' in product ? product.qnty : 1,
//     }));

//     let generatedOrderId;

//     if (!products.some(p => p.subscription)) {
//       generatedOrderId = await getNextSequence('orderId');

//       await Order.create({
//         orderId: generatedOrderId,
//         token,
//         status: 'pending',
//       });
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: `http://localhost:5173/success?orderId=${generatedOrderId}`,
//         cancel_url: 'http://localhost:5173/cancel',
//         metadata: { orderId: generatedOrderId },
//       });
//       res.json({ id: session.id });
//     } else if (products.some(p => p.subscription)) {
//       generatedOrderId = await getNextSequenceSpacialProduct('orderId');

//       // Save subscription order
//       await SubscribeOrder.create({
//         orderId: generatedOrderId,
//         token,
//         status: 'Deactive',
//       });

//       // Filter subscription products
//       const subscriptionLineItems = products
//         .filter(
//           (p): p is ISubscriptionProducts =>
//             'subscription' in p && p.subscription === true
//         )
//         .map(p => ({
//           price: p.priceId, // now TypeScript knows p is Products
//           quantity: 1,
//         }));

//       const session = await stripe.checkout.sessions.create({
//         mode: 'subscription',
//         payment_method_types: ['card'],
//         line_items: subscriptionLineItems, // ✅ pass the filtered subscription items
//         success_url: `http://localhost:5173/success?success=true&session_id=${generatedOrderId}`,
//         cancel_url: `http://localhost:5173/cancel?canceled=true`,
//         metadata: { orderId: generatedOrderId },
//       });

//       res.json({ id: session.id });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create checkout session.' });
//   }
// };

// // webhook enent for confimation the payment system...
// // webhook.controller.ts

// // Webhook handler for normal payments and subscription events
// const handleOrderPayment = async (orderId: string | undefined) => {
//   if (!orderId) return;

//   const order = await Order.findOne({ orderId: parseInt(orderId, 10) });
//   if (order && order.status !== 'paid') {
//     order.status = 'paid';
//     await order.save();
//     logger.info(order.token);
//     await sendPushNotification({
//       title: 'Payment Successful ✅',
//       body: `Your order ${orderId} was successful!`,
//       recipientToken: order.token,
//     });

//     console.log(`📩 One-time payment completed for order ${orderId}`);
//   }
// };

// const handleSubscription = async (
//   orderId: string | undefined,
//   status: 'active' | 'cancelled'
// ) => {
//   if (!orderId) return;

//   const subOrder = await SubscribeOrder.findOne({
//     orderId: parseInt(orderId, 10),
//   });
//   if (!subOrder) return;

//   subOrder.status = status;
//   await subOrder.save();

//   const messages = {
//     active: {
//       title: 'Subscription Active ✅',
//       body: `Your subscription for order ${orderId} is now active!`,
//       log: `🆕 Subscription activated/renewed for order ${orderId}`,
//     },
//     cancelled: {
//       title: 'Subscription Cancelled ❌',
//       body: `Your subscription for order ${orderId} has been cancelled.`,
//       log: `❌ Subscription cancelled for order ${orderId}`,
//     },
//   };

//   const msg = messages[status];
//   await sendPushNotification({
//     title: msg.title,
//     body: msg.body,
//     recipientToken: subOrder.token,
//   });
//   console.log(msg.log);
// };

// export const handleStripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers['stripe-signature'] as string;

//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );

//     const object = event.data.object as any;
//     const orderId = object.metadata?.orderId;

//     switch (event.type) {
//       // ✅ Always handle both one-time + subscription here
//       case 'checkout.session.completed': {
//         if (object.mode === 'payment') {
//           await handleOrderPayment(orderId);
//         } else if (object.mode === 'subscription') {
//           await handleSubscription(orderId, 'active');
//         }
//         break;
//       }

//       // ✅ Optional: keep subscription lifecycle sync
//       case 'customer.subscription.deleted': {
//         await handleSubscription(orderId, 'cancelled');
//         break;
//       }

//       default: {
//         console.log(`⚠️ Ignored event type: ${event.type}`);
//       }
//     }

//     res.json({ received: true });
//   } catch (err: any) {
//     console.error('❌ Webhook error:', err.message);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// };

//normalize the body content for extract the image

export const normalizeBody = (body: any) => {
  const cleaned: Record<string, any> = {};
  for (const key in body) cleaned[key.trim()] = body[key];
  return cleaned;
};

// @business logic of creating a post
// @method: post
//endpoint:api/v1/products
interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

// Controller
export const createProduct = catchAsync(
  async (req: MulterRequest, res: Response) => {
    try {
      const { dish, price, somedata, rating, address, qnty } = req.body;
      const image = req.files?.image?.[0]?.filename;
      const productInput: Partial<IProduct> = {
        dish,
        price: Number(price),
        image,
        somedata,
        rating: rating ? Number(rating) : undefined,
        address,
        qnty: qnty ? Number(qnty) : undefined,
      };

      const product = await productService.createProduct(productInput);

      res.status(201).json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: (err as Error).message });
    }
  }
);

// @business logic of to get all a post
// @method: get
//endpoint:api/v1/products
export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json({ success: true, data: products });
});
// @business logic of to get product by id a post
// @method: get
//endpoint:api/v1/products/:id
export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id);
  if (!product)
    return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, data: product });
});
// @business logic of to get all a post
// @method: put
//endpoint:api/v1/products/:id
export const updateProduct = catchAsync(
  async (req: MulterRequest, res: Response) => {
    const { dish, price, somedata, rating, address, qnty } = req.body;

    const image = (req.files as any)?.image?.[0]?.filename;

    // Build update data
    const updateData: Partial<IProduct> = {
      dish,
      price: price ? Number(price) : undefined,
      somedata,
      rating: rating ? Number(rating) : undefined,
      address,
      qnty: qnty ? Number(qnty) : undefined,
      image,
    };

    // Remove undefined keys so they won't overwrite existing values
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof IProduct] === undefined) {
        delete updateData[key as keyof IProduct];
      }
    });

    const updated = await productService.updateProduct(
      req.params.id,
      updateData
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    res.status(200).json({ success: true, data: updated });
  }
);

// @business logic of to delete product by Id
// @method: delete
//endpoint:api/v1/products/:id
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted)
    return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, message: 'Deleted successfully' });
});
