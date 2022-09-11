const connection = require('./connection');

const camelize = (newArray) => {
  const sale = newArray.map(
    ({ sale_id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    }),
  );
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

module.exports = {
  insert,
  insertSale,
  findById,
  findAll,
};
