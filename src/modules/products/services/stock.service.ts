import ProductModel from '../models/product.model';
import { exceptions } from '../../../messages/exceptions';
import IProduct from '../interfaces/products.interface';
import { Message } from 'amqplib';
import ServiceProduct from './products.service';

export default class ServiceStock {
  static async checkStock(products: IProduct[]): Promise<boolean> {
    try {
      const productsRetriev = await ProductModel.find({
        name: { $in: products.map(p => p.name) },
      });

      if(productsRetriev.length != products.length){
        return false;
      }
      
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

  static async getProductsQueue(message: Message){
    try {
      let product: IProduct = {name: message.content.toString()} as IProduct; 
  
      switch (message.fields.routingKey) {
        case 'incremented':
          product.quantity = 1;
          break;
  
        case 'decremented':
          product.quantity = -1;
          break;
  
        default:
          break;
      }
      return await ServiceProduct.processProductByQueue(product);
      
    } catch (error) {
      return false;
    }
  }
}
