// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};
const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product],
  );

  return {
    id: insertId,
    name: product,
  };
};

module.exports = {
  findById,
  findAll,
  insert,
};
