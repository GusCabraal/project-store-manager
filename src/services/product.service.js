const { productModel } = require('../models');

const getProductById = async (id) => {
  const [result] = await productModel.findById(id);
  if (result) {
    return { type: null, message: result };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const getProducts = async () => {
  const result = await productModel.findAll();
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const newProduct = await productModel.insert(name);
  return newProduct;
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
};