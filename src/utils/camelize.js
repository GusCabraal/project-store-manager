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

module.exports = camelize;