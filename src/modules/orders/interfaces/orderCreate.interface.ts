import IProduct from "../../products/interfaces/products.interface";

export default interface IOrderCreate extends Document {
  products: IProduct[];
}
