import express from 'express';
import * as spacialProductController from '../special_product/specialProduct.contrller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
const router = express.Router();

router.post(
  '/',
  fileUploadHandler(),
  spacialProductController.createSubscriptionProduct
);
router.get('/', spacialProductController.getSubscriptionProducts);
router.get('/:id', spacialProductController.getSubscriptionProduct);
router.put(
  '/:id',
  fileUploadHandler(),
  spacialProductController.updateSubscriptionProduct
);
router.delete('/:id', spacialProductController.deleteSubscriptionProduct);

export const SpacialProduct = router;
