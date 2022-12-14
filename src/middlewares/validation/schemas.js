const Joi = require('joi');

const addNewProduct = Joi.object({
  name: Joi.string().min(5).required(),
});

const saleItem = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

const newSale = Joi.array().items(saleItem);

module.exports = {
  addNewProduct,
  newSale,
};
