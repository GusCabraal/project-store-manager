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
  const { type, message } = await productService.createProduct(name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.updateProduct(name, id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
};
