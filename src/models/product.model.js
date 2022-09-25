const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const findByName = async (productName) => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
      WHERE name LIKE concat(?, '%');`,
    [productName],
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

const updateById = async (name, productId) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, productId],
  );
  return affectedRows;
};

const deleteById = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return affectedRows;
};

module.exports = {
  findById,
  findAll,
  insert,
  updateById,
  deleteById,
  findByName,
};
