import { Router } from 'express';
import routesProducts from './products/products.route';

const routes = Router();

routes.use('/products', routesProducts);

export default routes;