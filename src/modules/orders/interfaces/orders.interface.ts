import { Document } from 'mongoose';
import IOrderItem from './orderItem.interface';
import IProduct from 'src/modules/products/interfaces/products.interface';

export default interface IOrder extends Document {
  items: IOrderItem[];
  products: IProduct[];
  total: number;
}
