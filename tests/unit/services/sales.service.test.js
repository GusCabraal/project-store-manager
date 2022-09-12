const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");
const { salesResponse, saleResponse } = require("./mocks/sales.service.mock");

describe("Verificando as funções de leitura no service Sales", function () {
  describe("Buscando a lista de vendas", function () {
    it("com sucesso", async function () {
      sinon.stub(salesModel, "findAll").resolves(salesResponse);

      const products = await salesService.getSales();

      expect(products.type).to.equal(null);
      expect(products.message).to.equal(salesResponse);
    });
  });

  describe("Buscando uma venda por um ID", function () {
    it("Passando um Id invalido", async function () {
      const INVALID_ID = 20;
      sinon.stub(salesModel, "findById").resolves([]);

      const error = await salesService.getSaleById(INVALID_ID);

      expect(error.type).to.equal("SALE_NOT_FOUND");
      expect(error.message).to.equal("Sale not found");
    });

    it("Passando um Id valido", async function () {
      const VALID_ID = 2;
      sinon.stub(salesModel, "findById").resolves(saleResponse);

      const product = await salesService.getSaleById(VALID_ID);

      expect(product.type).to.equal(null);
      expect(product.message).to.be.deep.equal(saleResponse);
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});
