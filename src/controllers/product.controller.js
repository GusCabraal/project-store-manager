const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { message } = await productService.getProducts();

  // if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productService.createProduct(name);
  res.status(201).json(newProduct);
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
};
