import { SubscriptionProductModel } from './spacialProduct.order.model';
import { ISubscriptionProduct } from './sepacialProduct.interface';

// craete a product list
export const createProduct = async (payload: ISubscriptionProduct) => {
  return await SubscriptionProductModel.create(payload);
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
  payload: ISubscriptionProduct
) => {
  console.log(payload);
  return await SubscriptionProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
};
//delete a product fro database..
export const deleteProduct = async (id: string) => {
  return await SubscriptionProductModel.findByIdAndDelete(id);
};
