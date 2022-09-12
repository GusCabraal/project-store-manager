const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { salesModel } = require("../../../src/models");

const {
  salesResponse,
  salesResponseFromDB,
  saleResponse,
  saleResponseFromDB,
} = require("./mocks/sales.model.mock");

describe("Testes de unidade em SELECT products", function () {

  describe("Recuperando uma lista com todas as vendas", function () {
    it("Recuperando todas as vendas", async function () {
      sinon.stub(connection, "execute").resolves([salesResponseFromDB]);

      const result = await salesModel.findAll();
      
      expect(result).to.be.deep.equal(salesResponse);
    });
  })
  describe("Recuperando uma venda a partir do seu id", function () {
    it("Recuperando com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([[saleResponseFromDB]]);

      const result = await salesModel.findById(2);

      expect(result).to.be.deep.equal([saleResponse]);
    });
    it("Usando um ID inexistente", async function () {
      sinon.stub(connection, "execute").resolves([[]]);

      const result = await salesModel.findById(20);

      expect(result).to.be.deep.equal([]);
    });
  });

  afterEach(sinon.restore);
});