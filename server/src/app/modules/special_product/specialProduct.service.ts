import { SubscriptionProductModel } from './spacialProduct.order.model';
import { ISubscriptionProduct } from './sepacialProduct.interface';

// craete a product list
export interface CreateProductPayload
  extends Omit<Partial<ISubscriptionProduct>, 'images'> {
  images?: string[];
}

export const createProduct = async (payload: CreateProductPayload) => {
  const {
    name,
    description,
    price,
    billing_cycle,
    stripe_price_id,
    images = [],
  } = payload;
  return await SubscriptionProductModel.create({
    name,
    description,
    price,
    billing_cycle,
    stripe_price_id,
    image_url: images[0] || '',
  });
};
// get all product list....
export const getAllProducts = async () => {
  return await SubscriptionProductModel.find();
};
//  get product by id
export const getProductById = async (id: string) => {
  return await SubscriptionProductModel.findById(id);
};

//update the producrt list of a product
export const updateProduct = async (
  id: string,
  payload: CreateProductPayload
) => {
  return await SubscriptionProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
};
//delete a product fro database..
export const deleteProduct = async (id: string) => {
  return await SubscriptionProductModel.findByIdAndDelete(id);
};
