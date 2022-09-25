const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require("../../../src/services");
const { salesController} = require("../../../src/controllers");
const {
  salesResponse,
  saleResponse,
  newSaleResponse,
  updatedSaleResponse,
} = require("./mocks/sales.controller.mock");

describe("Verificando controller de LER sales", function () {
  describe("Teste de unidade de getSales", function () {
    it("Buscando todas as vendas", async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getSales")
        .resolves({ type: null, message: salesResponse });

      await salesController.getSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesResponse);
    });
  });
  describe("Teste de unidade de getSaleById", function () {
    it("Buscando um id valido", async function () {
      const res = {};
      const req = { params: { id: 1 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getSaleById")
        .resolves({ type: null, message: saleResponse });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleResponse);
    });
    it("Buscando um id invalido", async function () {
      const res = {};
      const req = { params: { id: 1000 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "getSaleById")
        .resolves({ type: "SALE_NOT_FOUND", message: "sale not found" });

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'sale not found'});
    });
    afterEach(sinon.restore);
  });
});

describe("Verificando controller de ESCREVER em sales", function () {
  describe("Teste de unidade de criar um produto", function () {
    it("Com sucesso", async function () {
      const res = {};
      const req = {
        params: {}, body: [
          {
            productId: 1,
            quantity: 1
          },
          {
            productId: 2,
            quantity: 1
          }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "createSales")
        .resolves({ type: null, message: newSaleResponse });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSaleResponse);
    });
    it("Passando um produto com id invalido", async function () {
      const res = {};
      const req = {
        params: {}, body: [
          {
            productId: 100,
            quantity: 1
          },
          {
            productId: 2,
            quantity: 1
          }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "createSales")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await salesController.createSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });
    afterEach(sinon.restore);
  });
});

describe("Verificando controller de ATUALIZAR em sales", function () {
  describe("Teste de unidade de atualizar uma venda", function () {
    it("Com sucesso", async function () {
      const res = {};
      const req = {
        params: { id: 3 },
        body: [
          {
            productId: 1,
            quantity: 10,
          },
          {
            productId: 2,
            quantity: 25,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "updateSale")
        .resolves({ type: null, message: updatedSaleResponse });

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedSaleResponse);
    });
    it("Sem sucesso", async function () {
      const res = {};
      const req = { params: { id: 100 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "updateSale").resolves({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
    afterEach(sinon.restore);
  });
});

describe("Verificando controller de DELETAR um produto", function () {
  describe("Teste de unidade de deletar um produto", function () {
    it("Com sucesso", async function () {
      const res = {};
      const req = { params: { id: 1 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "deleteSale")
        .resolves({ type: null, message: {} });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
    it("Sem sucesso", async function () {
      const res = {};
      const req = { params: { id: 100 }, body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, "deleteSale")
        .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
    afterEach(sinon.restore);
  });
});