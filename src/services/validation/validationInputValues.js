const { addNewProduct } = require('./schemas');

const validateNewProductSchema = (name) => {
  const { error } = addNewProduct.validate({ name });
  if (error) {
    if (error.message === '"name" is required') {
      return { type: 'BAD_REQUEST', message: error.message };
    }
    if (error.message) {
      return { type: 'INVALID_VALUE', message: error.message };
    }
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewProductSchema,
};
