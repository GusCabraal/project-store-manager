// src/services/validations/schemas.js

const Joi = require('joi');

const addNewProduct = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  addNewProduct,
};
