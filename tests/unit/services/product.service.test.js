const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const { productService } = require("../../../src/services");
const {
  productsResponse,
  productResponse,
  newProductResponse,
  updateProductResponse,
} = require("./mocks/product.service.mock");

describe("Verificando as funções de leitura no service Product", function () {
  describe("Buscando a lista de produtos", function () {
    it("com sucesso", async function () {
      sinon.stub(productModel, "findAll").resolves(productsResponse);

      const products = await productService.getProducts();

      expect(products.type).to.equal(null);
      expect(products.message).to.equal(productsResponse);
    });
  });

  describe("Buscando o produto por um ID", function () {
    it("Passando um Id invalido", async function () {
      const INVALID_ID = 20;
      sinon.stub(productModel, "findById").resolves([]);

      const error = await productService.getProductById(INVALID_ID);

      expect(error.type).to.equal("PRODUCT_NOT_FOUND");
      expect(error.message).to.equal("Product not found");
    });

    it("Passando um Id valido", async function () {
      const VALID_ID = 2;
      sinon.stub(productModel, "findById").resolves([productResponse]);

      const product = await productService.getProductById(VALID_ID);

      expect(product.type).to.equal(null);
      expect(product.message).to.equal(productResponse);
    });
    afterEach(function () {
      sinon.restore();
    });
  });

  describe("Buscando o produto por um nome", function () {
    it("Passando um nome invalido", async function () {
      const INVALID_NAME = "Xablau";
      sinon.stub(productModel, "findByName").resolves([]);

      const error = await productService.getProductsByName(INVALID_NAME);

      expect(error.type).to.equal("PRODUCT_NOT_FOUND");
      expect(error.message).to.equal("Product not found");
    });

    it("Passando um nome valido", async function () {
      const VALID_NAME = "Traje";
      sinon.stub(productModel, "findByName").resolves([productResponse]);

      const product = await productService.getProductsByName(VALID_NAME);

      expect(product.type).to.equal(null);
      expect(product.message).to.be.deep.equal([productResponse]);
    });

    it("Não passando um nome e retornando todos os produtos", async function () {
      sinon.stub(productModel, "findByName").resolves(productsResponse);

      const product = await productService.getProductsByName("");

      expect(product.type).to.equal(null);
      expect(product.message).to.be.deep.equal(productsResponse);
    });
    afterEach(function () {
      sinon.restore();
    });
  });

});

describe("Verificando as funções de escrita no service Product", function () {
  describe("Cadastrando um novo produto", function () {
    it("com sucesso", async function () {
      const NEW_PRODUCT_NAME = "Calção do Hulk";
      sinon.stub(productModel, "insert").resolves(newProductResponse);

      const products = await productService.createProduct(NEW_PRODUCT_NAME);

      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal({
        id: 4,
        name: "Calção do Hulk",
      });
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});

describe("Verificando as funções de atualização no service Product", function () {
  describe("Atualizando um produto", function () {
    it("com sucesso", async function () {
      const NEW_PRODUCT_NAME = "Calção do Hulk";
      const VALID_ID = 1;
      const SUCCESSFUL_INSERTION = 1;
      sinon.stub(productModel, "updateById").resolves(SUCCESSFUL_INSERTION);

      const products = await productService.updateProduct(
        NEW_PRODUCT_NAME,
        VALID_ID
      );

      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal(updateProductResponse);
    });

    it("sem sucesso", async function () {
      const NEW_PRODUCT_NAME = "Calção do Hulk";
      const INVALID_ID = 1000;
      const UNSUCCESSFUL_INSERTION = 0;
      sinon.stub(productModel, "updateById").resolves(UNSUCCESSFUL_INSERTION);

      const products = await productService.updateProduct(
        NEW_PRODUCT_NAME,
        INVALID_ID
      );

      expect(products.type).to.equal("PRODUCT_NOT_FOUND");
      expect(products.message).to.equal("Product not found");
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe("Verificando as funções de deleção no service Product", function () {
  describe("Deletando um produto", function () {
    it("com sucesso", async function () {
      const VALID_ID = 1;
      const SUCCESSFUL_DELETION = 1;
      sinon.stub(productModel, "deleteById").resolves(SUCCESSFUL_DELETION);

      const products = await productService.deleteProduct(VALID_ID);

      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal({});
    });

    it("sem sucesso", async function () {
      const INVALID_ID = 1000;
      const UNSUCCESSFUL_DELETION = 0;
      sinon.stub(productModel, "deleteById").resolves(UNSUCCESSFUL_DELETION);

      const products = await productService.deleteProduct(INVALID_ID);

      expect(products.type).to.equal("PRODUCT_NOT_FOUND");
      expect(products.message).to.equal("Product not found");
    });
    afterEach(function () {
      sinon.restore();
    });
  });

});
