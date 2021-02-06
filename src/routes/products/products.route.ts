import { Router } from 'express';
import ProductsController from '../../modules/products/controllers/products.controller';

const router = Router();

router.get('/:name', ProductsController.find);
router.get('/', ProductsController.all);
router.post('/', ProductsController.create);
 
export default router;