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