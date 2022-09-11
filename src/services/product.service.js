const { productModel } = require('../models');
const {
  validateNewProductSchema,
} = require('./validation/validationInputValues');

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
  const error = validateNewProductSchema(name);
  if (error.type) return error;
  const newProduct = await productModel.insert(name);
  return { type: null, message: newProduct };
};

const updateProduct = async (name, id) => {
  const error = validateNewProductSchema(name);
  if (error.type) return error;
  const errorSQL = await productModel.updateById(name, id);
  if (errorSQL) {
    return { type: null, message: { id, name } };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};
const deleteProduct = async (id) => {
  const errorSQL = await productModel.deleteById(id);
  if (errorSQL) {
    return { type: null, message: {} };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
