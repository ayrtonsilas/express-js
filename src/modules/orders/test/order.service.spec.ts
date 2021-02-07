import ServiceProduct from '../../products/services/products.service';
import ServiceOrder from '../services/orders.service';
import {
  connectMemory,
  clearDatabaseMemory,
  closeDatabaseMemory,
} from '../../../configs/memoryDatabase';
import IProduct from '../../products/interfaces/products.interface';
import { mockProduct } from '../../products/mocks/product.mock';
import { mockOrder, mockOrderCreate } from '../mocks/order.mock';
import IOrder from '../interfaces/orders.interface';
import IOrderCreate from '../interfaces/orderCreate.interface';

describe('Test product', () => {
  let createdProduct: string = '';
  let product: IProduct = null; 
  let orderParams: IOrderCreate = null;
  let orderMock: IOrder = null;

  beforeAll(async () => {
    await connectMemory();
    product = await ServiceProduct.create(mockProduct); 
    orderParams = mockOrderCreate(product);
    orderMock = mockOrder(product);
  });

  afterAll(async () => {
    await clearDatabaseMemory();
    await closeDatabaseMemory();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('create order', async () => {
    const order: IOrder = await ServiceOrder.create(orderParams);
    createdProduct = order._id;
    expect(orderMock.total).toEqual(order.total);
  });

  it('find order', async () => {
    const order: IOrder = await ServiceOrder.find(createdProduct);
    expect(orderMock.total).toEqual(order.total);
  });
});
