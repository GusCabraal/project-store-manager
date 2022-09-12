const { salesModel, productModel } = require('../models');

const date = new Date();

const getSales = async () => {
  const result = await salesModel.findAll();
  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length > 0) {
    return { type: null, message: result };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const saveSales = (sales, newSale) => {
  if (sales && sales.length > 0) {
    return sales.map(async ({ productId, quantity }) => {
      await salesModel.insert(newSale, productId, quantity);
    });
  }
};
const updateSales = (saleId, itemsUpdated) => {
  if (itemsUpdated && itemsUpdated.length > 0) {
    return itemsUpdated.map(async ({ productId, quantity }) => {
      const result = await salesModel.updateById(saleId, productId, quantity);
              if (result) return true;
              return false;
    });
  }
};

const allProductsExists = (sales) => {
  if (sales && sales.length > 0) {
    return sales.map(async ({ productId }) => {
      const [product] = await productModel.findById(productId);
        if (product) return true;
        return false;
    });
  }
  return [];
};

const createSales = async (sales) => {
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

const updateSale = async (saleId, itemsUpdated) => {
  const promisseProduct = await Promise.all(allProductsExists(itemsUpdated));
  if (promisseProduct.includes(false)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const promisseUpdate = await Promise.all(updateSales(saleId, itemsUpdated));
  if (promisseUpdate.includes(false)) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: { saleId, itemsUpdated } };
};

const deleteSale = async (id) => {
  const errorSQL = await salesModel.deleteById(id);
  if (errorSQL) {
    return { type: null, message: {} };
  }
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

module.exports = {
  createSales,
  getSaleById,
  getSales,
  deleteSale,
  updateSale,
};