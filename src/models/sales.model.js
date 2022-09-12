const camelize = require('../utils/camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      SP.sale_id,
      S.date,
      SP.product_id,
      SP.quantity
    FROM StoreManager.sales AS S
    JOIN StoreManager.sales_products AS SP ON SP.sale_id = S.id;`,
  );
  const sale = camelize(result);
  return sale;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      SP.sale_id,
      S.date,
      SP.product_id,
      SP.quantity
    FROM StoreManager.sales AS S
    JOIN StoreManager.sales_products AS SP ON SP.sale_id = S.id
    WHERE SP.sale_id = ?;`,
    [id],
  );

  const sale = camelize(result).map(({ date, productId, quantity }) => (
    { date, productId, quantity }
  ));

  return sale;
};

const insertSale = async (date) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?)',
    [date],
  );
  return insertId;
};

const insert = async (id, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?`,
    [id],
  );
  return affectedRows;
};

const findSaleById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE id = ?',
    [productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  insertSale,
  deleteById,
  findSaleById,
};
