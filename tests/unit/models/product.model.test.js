const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { productModel } = require("../../../src/models");

const {
  productsResponse,
  productResponse,
} = require("./mocks/product.model.mock");

describe("Testes de unidade do model de products", function () {
  describe("Recuperando um product a partir do seu id", function () { 
    it("Recuperando com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([[productResponse]]);
      const result = await productModel.findById(2);
      expect(result).to.be.deep.equal([productResponse]);
    });
    it("Usando um ID inexistente", async function () {
      sinon.stub(connection, "execute").resolves([[]]);
      const result = await productModel.findById(20);
      expect(result).to.be.deep.equal([]);
    });
  })
  it("Recuperando todos os products", async function () {
    sinon.stub(connection, "execute").resolves([productsResponse]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(productsResponse);
  });

  afterEach(sinon.restore);
});
