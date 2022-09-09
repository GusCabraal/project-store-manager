const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../src/models/product.model");
const {productService} = require("../../../src/services");
const {
  productsResponse,
  productResponse,
} = require("./mocks/product.service.mock");

const INVALID_ID = 20; 
const VALID_ID = 2; 

describe("Verificando service Product", function () {
  describe("Buscando o produto por um ID", function () {
    it("Passando um Id invalido", async function () {
      sinon.stub(productModel, "findById").resolves([]);
      const error = await productService.getProductById(INVALID_ID);

      expect(error.type).to.equal("PRODUCT_NOT_FOUND");
      expect(error.message).to.equal("Product not found");
    });

    it("Passando um Id valido", async function () {
      sinon.stub(productModel, "findById").resolves([productResponse]);
      const product = await productService.getProductById(VALID_ID);
      
      expect(product.type).to.equal(null);
      expect(product.message).to.equal(productResponse);
    });
  });

  describe("Buscando a lista de produtos", function () {
      beforeEach(function () {
        sinon.stub(productModel, "findAll").resolves(productsResponse);
      });
    it("com sucesso", async function () {
      const products = await productService.getProducts();

      expect(products.type).to.equal(null);
      expect(products.message).to.equal(productsResponse);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
