import ServiceProduct from '../services/products.service';
import {
  connectMemory,
  clearDatabaseMemory,
  closeDatabaseMemory,
} from '../../../configs/memoryDatabase';
import IProduct from '../interfaces/products.interface';
import { mockProduct } from '../mocks/product.mock';

describe('Test product', () => {
  beforeAll(async () => await connectMemory());

  afterAll(async () => {
    await clearDatabaseMemory();
    await closeDatabaseMemory();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('create product', async () => {
    const product: IProduct = await ServiceProduct.create(mockProduct);
    expect(mockProduct.name).toEqual(product.name);
  });

  it('find product', async () => {
    const product: IProduct = await ServiceProduct.find(mockProduct.name);
    expect(mockProduct.name).toEqual(product.name);
  });
});
