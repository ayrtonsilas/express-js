import ProductModel from '../models/product.model';
import { exceptions } from '../../../messages/exceptions';
import IProduct from '../interfaces/products.interface';
import CustomException from '../../../exceptions/custom.exception';

export default class ServiceProduct{
  static async all(): Promise<IProduct[]> {
    try {
      const products: IProduct[] = ((await ProductModel.find()) as unknown[]) as IProduct[];
      return products;
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }
  
  static async find(name: string): Promise<IProduct> {
    try {
      const product = await ProductModel.findOne({ name });
      
      return (product as unknown) as IProduct;
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }

  static async create(data: IProduct): Promise<IProduct> {
    try {
      const findProduct = await this.find(data.name);
      if(findProduct){
        throw new CustomException(exceptions.product.exists,400); 
      }

      const product = new ProductModel(data);
      const savedProduct = await product.save();
      
      if(savedProduct._id){
        return (savedProduct as unknown) as IProduct;
      }
      throw new CustomException(exceptions.product.create,400); 
      
    } catch (error) {
      throw error;
    }
  }
}