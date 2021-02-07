import mongoose from 'mongoose';
import IProduct from '../interfaces/products.interface';
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
  },
  { versionKey: false },
);
const ProductModel = mongoose.model<IProduct>('products', productSchema);

export default ProductModel;
