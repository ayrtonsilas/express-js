import * as faker from 'faker';
import IOrder from '../interfaces/orders.interface';
import IProduct from '../../products/interfaces/products.interface';
import IOrderCreate from '../interfaces/orderCreate.interface';

export const mockOrder = (product: IProduct): IOrder => {
  const { name, quantity } = product;
  return {
    products: [{ name, quantity }],
    total: quantity,
  } as IOrder;
};

export const mockOrderCreate = (product: IProduct): IOrderCreate => {
  const { name, quantity } = product;
  return {
    products: [{ name, quantity }],
  } as IOrderCreate;
};
