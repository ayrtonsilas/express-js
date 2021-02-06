import ProductModel from '../models/product.model';
import { exceptions } from '../../../messages/exceptions';
import IProduct from '../interfaces/products.interface';

export default class ServiceStock {
  static async checkStock(products: IProduct[]): Promise<boolean> {
    try {
      const productsRetriev = await ProductModel.find({
        name: { $in: products.map(p => p.name) },
      });
      console.log(productsRetriev);
      for(const product of productsRetriev){
        if(product.quantity < products.find(p => p.name === product.name).quantity){
          return false;
        }
      }
      return true;
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }
}
