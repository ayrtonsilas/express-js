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

  static async findMultiple(names: string[]): Promise<IProduct[]> {
    try {
      return await ProductModel.find({
        name: { $in: names },
      });
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

      if (data.quantity < 0) {
        throw new CustomException(exceptions.product.attributes.quantity, 400);
      }
      if (!data.price || data.price < 0) {
        throw new CustomException(exceptions.product.attributes.price, 400);
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

  static async update(data: IProduct): Promise<boolean> {
    try {
      let product = await this.find(data.name);
      if (!product) {
        throw new CustomException(exceptions.product.notExists, 400);
      }

      if (data.quantity >= 0) {
        product.quantity = data.quantity;
      }

      if (!!data.price && data.price > 0) {
        product.price = data.price;
      }

      if (product.quantity < 0) {
        throw new CustomException(exceptions.stock.empty, 400);
      }

      const savedProduct = await product.save();

      if (savedProduct._id) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  static async processProductFromQueue(product: IProduct): Promise<boolean> {
    try {
      if (product._id) {
        return await this.update(product);
      } else {
        return !!(await this.create(product));
      }
    } catch (error) {
      return false;
    }
  }

  static async findById(id: string): Promise<IProduct> {
    try {
      return await ProductModel.findOne({ _id: id });
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }
}
