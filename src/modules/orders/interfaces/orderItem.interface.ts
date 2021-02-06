import { Document } from 'mongoose';

export default interface IOrderItem extends Document {
  quantity: number;
  productId: string;
  orderId: string;
}
