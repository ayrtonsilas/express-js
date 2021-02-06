import ProductModel from '../models/product.model';
import { exceptions } from '../../../messages/exceptions';
import IProduct from '../interfaces/products.interface';
import CustomException from '../../../exceptions/custom.exception';

export default class ServiceProduct {
  static async all(): Promise<IProduct[]> {
    try {
      const products: IProduct[] = await ProductModel.find();
      return products;
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }

  static async find(name: string): Promise<IProduct> {
    try {
      return await ProductModel.findOne({ name });
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }

  static async create(data: IProduct): Promise<IProduct> {
    try {
      const findProduct = await this.find(data.name);
      if (findProduct) {
        throw new CustomException(exceptions.product.exists, 400);
      }

      const product = new ProductModel(data);
      const savedProduct = await product.save();

      if (savedProduct._id) {
        return savedProduct;
      }
      throw new CustomException(exceptions.product.create, 400);
    } catch (error) {
      throw error;
    }
  }

  static async calculateTotal(products: IProduct[]): Promise<number> {
    if (!products.length) {
      return 0;
    }
    return await products
      .map((product: IProduct) => product as any)
      .reduce((prev: number, current: IProduct) => prev + current.quantity, 0);
  }

  static async findById(id: string): Promise<IProduct> {
    try {
      return await ProductModel.findOne({ _id: id });
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }
}
