import { Router } from 'express';
import OrdersController from '../../modules/orders/controllers/orders.controller';

const router = Router();

router.get('/:id', OrdersController.find);
router.get('/', OrdersController.all);
router.post('/', OrdersController.create);
 
export default router;