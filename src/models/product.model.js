// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};
const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

module.exports = {
  findById,
  findAll,
};
