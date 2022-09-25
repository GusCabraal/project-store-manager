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

const saleResponse = [
  {
    date: "2022-09-12T19:52:35.000Z",
    productId: 3,
    quantity: 15,
  },
];

const newSaleResponse = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 1,
    },
    {
      productId: 3,
      quantity: 5,
    },
  ],
};

const updatedSaleResponse = {
  saleId: 3,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10001,
    },
    {
      productId: 2,
      quantity: 250,
    },
  ],
};

module.exports = {
  salesResponse,
  saleResponse,
  newSaleResponse,
  updatedSaleResponse,
};
