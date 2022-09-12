const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require("../../../src/services");
const {productController} = require("../../../src/controllers");
const {
  productsResponse,
  productResponse,
  newProductResponse,
  updateProductResponse,
} = require("./mocks/product.controller.mock");

describe("Verificando controller de LER products", function () {
  describe("Teste de unidade de get products", function () {
    it("Buscando todos os produtos", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProducts")
        .resolves({ type: null, message: productsResponse });

      await productController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsResponse);
    });
  });
  describe("Teste de unidade de get productById", function () {
    it("Buscando um id valido", async function () {
      const res = {};
      const req = { params: { id: 1 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProductById")
        .resolves({ type: null, message: productResponse });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productResponse);
    });
    it("Buscando um id invalido", async function () {
      const res = {};
      const req = { params: { id: 1000 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProductById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "product not found" });

      await productController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'product not found'});
    });
  });
  describe("Teste de unidade de get productByName", function () {
    it("Buscando um nome valido", async function () {
      const res = {};
      const req = { query: { name: 'Traje' }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProductsByName")
        .resolves({ type: null, message: productResponse });

      await productController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productResponse);
    });
    it("Buscando um nome invalido", async function () {
      const res = {};
      const req = { query: { name: 'xablau' }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProductsByName")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "product not found" });

      await productController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'product not found'});
    });
    it("Não passando um nome e retornando todos os produtos", async function () {
      const res = {};
      const req = { query: { name: "" }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "getProductsByName")
        .resolves({ type: null, message: productsResponse });

      await productController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsResponse);
    });
  });

  afterEach(sinon.restore);
});

describe("Verificando controller de ESCREVER em products", function () {
  describe("Teste de unidade de criar um produto", function () {
    it("Com sucesso", async function () {
      const res = {};
      const req = { params: {}, body: { name: "Calção do Hulk" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "createProduct")
        .resolves({ type: null, message: newProductResponse });

      await productController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductResponse);
    });
    afterEach(sinon.restore);
  });

});

describe("Verificando controller de ATUALIZAR em products", function () {
  describe("Teste de unidade de atualizar um produto", function () {
    it("Com sucesso", async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: "Calção do Hulk" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "updateProduct")
        .resolves({ type: null, message: updateProductResponse });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateProductResponse);
    });
    it("Sem sucesso", async function () {
      const res = {};
      const req = { params: { id: 100 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "updateProduct")
        .resolves({
          type: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
    afterEach(sinon.restore);
  });
  });

describe("Verificando controller de DELETAR um produto", function () {
  describe("Teste de unidade de deletar um produto", function () {
    it("Com sucesso", async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "deleteProduct")
        .resolves({ type: null, message: {} });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
    it("Sem sucesso", async function () {
      const res = {};
      const req = { params: { id: 100 }, body: { } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "deleteProduct")
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.deleteProduct(req, res);

       expect(res.status).to.have.been.calledWith(404);
       expect(res.json).to.have.been.calledWith({
         message: "Product not found",
       });
    });
    afterEach(sinon.restore);
  });

});
