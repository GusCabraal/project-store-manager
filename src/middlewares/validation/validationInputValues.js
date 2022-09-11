const { addNewProduct, newSale } = require('./schemas');

const validateNewProductSchema = async (req, res, next) => {
  const { name } = req.body;
  const { error } = addNewProduct.validate({ name });
  if (error) {
    if (error.message === '"name" is required') {
      const { message } = error;
      return res.status(400).json({ message });
    }
    if (error.message) {
      const { message } = error;
      return res.status(422).json({ message });
    }
  }
  next();
};
const validateNewSaleSchema = async (req, res, next) => {
  const { error } = newSale.validate(req.body);
  if (error) {
    if (error.details[0].type === 'any.required') {
      const message = `"${error.details[0].context.key}" is required`;
      return res.status(400).json({ message });
    }
    if (error.details[0].type === 'number.min') {
      const message = `"${error.details[0].context.key}" must be greater than or equal to 1`;
      return res.status(422).json({ message });
    }
  }
  next();
};

module.exports = {
  validateNewProductSchema,
  validateNewSaleSchema,
};
