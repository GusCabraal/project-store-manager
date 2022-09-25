const salesResponse = [
  {
    saleId: 1,
    date: "2022-09-12T19:52:35.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-09-12T19:52:35.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-09-12T19:52:35.000Z",
    productId: 3,
    quantity: 15,
  },
];
const salesResponseFromDB = [
  {
    sale_id: 1,
    date: "2022-09-12T19:52:35.000Z",
    product_id: 1,
    quantity: 5,
  },
  {
    sale_id: 1,
    date: "2022-09-12T19:52:35.000Z",
    product_id: 2,
    quantity: 10,
  },
  {
    sale_id: 2,
    date: "2022-09-12T19:52:35.000Z",
    product_id: 3,
    quantity: 15,
  },
];

const saleResponse = {
  date: "2022-09-12T19:52:35.000Z",
  productId: 3,
  quantity: 15,
};
  
const saleResponseFromDB = {
  sale_id: 2,
  date: "2022-09-12T19:52:35.000Z",
  product_id: 3,
  quantity: 15,
};

const saleProductResponseFromDB = {
  sale_id: 1,
  product_id: 2,
  quantity: 3,
}

module.exports = {
  salesResponse,
  salesResponseFromDB,
  saleResponse,
  saleResponseFromDB,
  saleProductResponseFromDB,
};
