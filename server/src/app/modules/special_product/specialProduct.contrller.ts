// controllers/subscriptionProduct.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import * as subscriptionProductService from './specialProduct.service';
import { normalizeBody } from '../products/product.controller';

interface FileRequest extends Request {
  files: {
    image?: Express.Multer.File[]; // image key holds an array of File objects
  };
}
//@ business logic for creating a subscription.
//@ method:post
//@endpoint:api/v1/spacial/product

export const createSubscriptionProduct = catchAsync(
  async (req: FileRequest, res: Response) => {
    const { name, description, price, billing_cycle, stripe_price_id } =
      req.body;

    const image = req.files?.image?.[0]?.filename;

    const product = await subscriptionProductService.createProduct({
      name,
      description,
      price: Number(price),
      billing_cycle,
      image,
      stripe_price_id,
    });
    res.status(201).json({ success: true, data: product });
  }
);

//@ business logic for get all  a subscription product
//@ method:get
//@endpoint:api/v1/spacial/product
export const getSubscriptionProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await subscriptionProductService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  }
);

//@ business logic for get subscription product by Id a subscription.
//@ method:get
//@endpoint:api/v1/spacial/product/:id
export const getSubscriptionProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await subscriptionProductService.getProductById(
      req.params.id
    );
    if (!product)
      return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: product });
  }
);

//@ business logic for updating subscription.
//@ method:put
//@endpoint:api/v1/spacial/product/:id
export const updateSubscriptionProduct = catchAsync(
  async (req: FileRequest, res: Response) => {
    const { name, description, price, billing_cycle, stripe_price_id } =
      req.body;
    const image = req.files?.image?.[0]?.filename;
    const product = await subscriptionProductService.updateProduct(
      req.params.id,
      {
        name,
        description,
        price,
        billing_cycle,
        image,
        stripe_price_id,
      }
    );
    if (!product)
      return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: product });
  }
);

//@ business logic for creating a subscription.
//@ method:delete
//@endpoint:api/v1/spacial/product/:id
export const deleteSubscriptionProduct = catchAsync(
  async (req: Request, res: Response) => {
    const product = await subscriptionProductService.deleteProduct(
      req.params.id
    );
    if (!product)
      return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  }
);
