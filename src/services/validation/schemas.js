// src/services/validations/schemas.js

const Joi = require('joi');

const addNewProduct = Joi.object({
  name: Joi.string().min(5).required(),
});

const newSale = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  addNewProduct,
  newSale,
};
