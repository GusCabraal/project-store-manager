const { salesModel, productModel } = require('../models');
const {
  validateNewSaleSchema,
} = require('./validation/validationInputValues');

// const date = '2022-05-05';
const date = new Date();

const saveSales = (sales, newSale) => {
  if (sales && sales.length > 0) {
    return sales.map(async ({ productId, quantity }) => {
      await salesModel.insert(newSale, productId, quantity);
    });
  }

  // return [];
};
// const productsNewSalesExist = async (sales) => {
//   sales.map(async (sale) => {
//     await productModel.findById(sale.productId);
//   });

  const allProductsExists = (sales) => {
    if (sales && sales.length > 0) {
      return sales.map(async ({ productId }) => {
        const [product] = await productModel.findById(productId);
          if (product) {
            return true;
          }
          return false;
      });
    }
    return [];
  };

const createSales = async (sales) => {
  const error = validateNewSaleSchema(sales);
  if (error.type) return error;

  const promisseAll = await Promise.all(allProductsExists(sales));
  if (promisseAll.includes(false)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
    const saleId = await salesModel.insertSale(date);
  await Promise.all(saveSales(sales, saleId));
  const newSales = {
    id: saleId,
    itemsSold: sales,
  };
  return { type: null, message: newSales };
};

const getSaleById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length > 0) {
    return { type: null, message: result };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const getSales = async () => {
  const result = await salesModel.findAll();
  return { type: null, message: result };
};

module.exports = {
  createSales,
  getSaleById,
  getSales,
};