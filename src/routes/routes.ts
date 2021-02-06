import { Router } from 'express';
import routesProducts from './products/products.route';
import routesOrders from './orders/orders.route';

const routes = Router();

routes.use('/products', routesProducts);
routes.use('/orders', routesOrders);

export default routes;