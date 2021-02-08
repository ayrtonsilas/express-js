import mongoose from 'mongoose';
import IOrderItem from '../interfaces/orderItem.interface';
const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    quantity: Number,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
  },
  { versionKey: false },
);
const OrderItemModel = mongoose.model<IOrderItem>(
  'ordersItems',
  orderItemSchema,
);

export default OrderItemModel;
