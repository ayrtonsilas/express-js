import * as faker from 'faker';
import IProduct from '../interfaces/products.interface';

export const mockProduct: IProduct = {
    name: faker.name.findName(),
    price: faker.random.number(),
    quantity: faker.random.number(),
  } as IProduct;