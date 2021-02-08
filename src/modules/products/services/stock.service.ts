import ProductModel from '../models/product.model';
import { exceptions } from '../../../messages/exceptions';
import IProduct from '../interfaces/products.interface';
import { Message } from 'amqplib';
import ServiceProduct from './products.service';
import CustomException from '../../../exceptions/custom.exception';

export default class ServiceStock {
  static async checkStock(products: IProduct[]): Promise<boolean> {
    try {
      const recoveredProducts = await ServiceProduct.findMultiple(
        products.map((p) => p.name),
      );

      if (recoveredProducts.length != products.length) {
        return false;
      }

      for (const product of recoveredProducts) {
        if (
          product.quantity <
          products.find((p) => p.name === product.name).quantity
        ) {
          return false;
        }
      }
      return true;
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }

  static async getProductsQueue(message: Message) {
    try {
      const productName = message.content.toString().replace(/"/g, '');
      let product: IProduct = await ServiceProduct.find(productName);

      if (!product) {
        product = {
          name: productName,
          quantity: 0,
          price: 1,
        } as IProduct;
      }

      switch (message.fields.routingKey) {
        case 'incremented':
          product.quantity += 1;
          break;

        case 'decremented':
          product.quantity += -1;
          break;
        default:
          product.quantity += 1;
          break;
      }

      if (product.quantity < 0) {
        throw new CustomException(exceptions.stock.empty, 400);
      }

      return await ServiceProduct.processProductFromQueue(product);
    } catch (error) {
      return false;
    }
  }
}
