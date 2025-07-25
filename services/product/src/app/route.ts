import { Router } from 'express';
import { productController } from './controller';
import validateRequest from './middlewares/validateRequest';
import { createProductValidation } from './validation';


const router = Router();

router.get('/all', productController.getAllProduct);
router.post(
  '/create',
  validateRequest(createProductValidation),
  productController.createProduct
);
router.get('/:id', productController.getProductById);


router.put(
  '/:id',
  productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

export const productRoutes = router;
