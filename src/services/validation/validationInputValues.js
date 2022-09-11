const { addNewProduct, newSale } = require('./schemas');

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
const validateNewSaleSchema = (sales) => {
  const { error } = newSale.validate(sales);
  if (error) {
    if (error.message.includes('is required')) {
      const message = `"${error.message.split('.')[1]}`;
      return { type: 'BAD_REQUEST', message };
    }
    if (error.message) {
      const message = `"${error.message.split('.')[1]}`;
      return { type: 'INVALID_VALUE', message };
    }
  }
  return { type: null, message: '' };
};

module.exports = {
  validateNewProductSchema,
  validateNewSaleSchema,
};
