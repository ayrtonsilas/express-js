import mongoose from 'mongoose';
import IProduct from '../interfaces/products.interface';
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: Number,
    quantity: Number,
  },
  { versionKey: false },
);
const ProductModel = mongoose.model<IProduct>('products', productSchema);

export default ProductModel;
