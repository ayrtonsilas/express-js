export const exceptions = {
  product: {
    create: 'Error to save product',
    exists: 'Product already exists',
    notExists: 'Product not exists',
    attributes: {
      price: 'price is required',
      quantity: 'quantity is required'
    }
  },
  order: {
    findName: 'Error to searching order',
    create: 'Error to save order',
    item: {
      create: 'Error to save order item',
    },
  },
  stock: {
    empty: 'stock empty',
  },
  internalServer: 'Internal server error',
};
