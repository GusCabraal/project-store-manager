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

const findSaleById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE id = ?',
    [productId],
  );
  return result;
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

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (now())',
  );
  return insertId;
};

const insertSaleProduct = async (id, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );
  return insertId;
};

const updateById = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?;`,
    [quantity, saleId, productId],
  );
  return affectedRows;
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
      WHERE sale_id = ?`,
    [id],
  );
  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insertSaleProduct,
  insertSale,
  findSaleById,
  deleteById,
  updateById,
};
