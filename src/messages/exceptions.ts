export const exceptions = {
  product: {
    create: 'Error to save product',
    exists: 'Product already exists',
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
