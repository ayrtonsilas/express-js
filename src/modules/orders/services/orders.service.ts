import OrderModel from '../models/order.model';
import { exceptions } from '../../../messages/exceptions';
import IOrder from '../interfaces/orders.interface';
import CustomException from '../../../exceptions/custom.exception';
import IOrderCreate from '../interfaces/orderCreate.interface';
import IProduct from '../../products/interfaces/products.interface';
import ServiceOrderItem from './orderItem.service';
import IOrderItem from '../interfaces/orderItem.interface';
import ServiceProduct from '../../products/services/products.service';
import ServiceStock from '../../products/services/stock.service';

export default class ServiceOrder {
  static async all(): Promise<IOrder[]> {
    try {
      const orders: IOrder[] = await OrderModel.find().populate('items');
      let response: IOrder[] = [];
      for (const order of orders) {
        response.push(await this.formatGetOrder(order));
      }
      return response;
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }

  static async find(id: string): Promise<IOrder> {
    try {
      const order = await OrderModel.findOne({ _id: id }).populate('items');
      return await this.formatGetOrder(order);
    } catch (error) {
      throw new Error(exceptions.internalServer);
    }
  }

  static async create(data: IOrderCreate): Promise<IOrder> {
    try {
      if (!(await ServiceStock.checkStock(data.products))) {
        throw new CustomException(exceptions.stock.empty, 400);
      }

      const total = await ServiceProduct.calculateTotal(data.products);
      const order = new OrderModel({
        total,
      });
      const savedOrder = await order.save();

      await this.linkOrderItems(savedOrder, data.products);

      if (savedOrder._id) {
        return this.formatGetOrder(savedOrder.populate('items'));
      }

      throw new CustomException(exceptions.order.create, 400);
    } catch (error) {
      throw error;
    }
  }

  static async linkOrderItems(
    order: IOrder,
    products: IProduct[],
  ): Promise<boolean> {
    try {
      for (const product of products) {
        const retrievProduct = await ServiceProduct.find(product.name);

        const createdItem = await ServiceOrderItem.create({
          productId: retrievProduct._id,
          quantity: product.quantity,
          orderId: order._id,
        } as IOrderItem);

        order.items.push(createdItem);
      }

      await order.save();
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async formatGetOrder(order: IOrder): Promise<IOrder> {
    const { _id, total } = order;
    const products = await ServiceOrderItem.formatItems(order.items);
    return { _id, products, total: total } as IOrder;
  }
}
