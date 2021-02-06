import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
  },
  { versionKey: false },
);
const ProductModel = mongoose.model('products', productSchema);

export default ProductModel;
