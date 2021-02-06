import OrderModel from '../models/order.model';
import { exceptions } from '../../../messages/exceptions';
import CustomException from '../../../exceptions/custom.exception';
import IOrderItem from '../interfaces/orderItem.interface';
import OrderItemModel from '../models/orderItems.model';
import IProduct from '../../products/interfaces/products.interface';
import ServiceProduct from '../../products/services/products.service';

export default class ServiceOrderItem {
  static async create(data: IOrderItem): Promise<IOrderItem> {
    try {
      const orderItem = new OrderItemModel({
        quantity: data.quantity,
        productId: data.productId,
      });

      const savedOrderItme = await orderItem.save();

      if (savedOrderItme._id) {
        return savedOrderItme;
      }
      throw new CustomException(exceptions.order.item.create, 400);
    } catch (error) {
      throw error;
    }
  }

  static async formatItems(items: IOrderItem[]) {
    let response: IProduct[] = [];
    for (const item of items) {
      response.push({
        name: (await ServiceProduct.findById(item.productId)).name,
        quantity: item.quantity,
      } as IProduct);
    }
    return response;
  }
}
