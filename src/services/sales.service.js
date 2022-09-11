const { salesModel } = require('../models');
// const {
//   validateNewProductSchema,
// } = require('./validation/validationInputValues');

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

const createSales = async (sales) => {
  const newSale = await salesModel.insertSale(date);
  await Promise.all(saveSales(sales, newSale));
  const newSales = {
    id: newSale,
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
