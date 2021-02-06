import mongoose from 'mongoose';
import IOrder from '../interfaces/orders.interface';
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    total: Number,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ordersItems' }],
  },
  { versionKey: false },
);
const OrderModel = mongoose.model<IOrder>('orders', orderSchema);

export default OrderModel;
