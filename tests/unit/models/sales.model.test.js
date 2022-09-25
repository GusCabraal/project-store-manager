const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { salesModel } = require("../../../src/models");

const {
  salesResponse,
  salesResponseFromDB,
  saleResponse,
  saleResponseFromDB,
  saleProductResponseFromDB,
} = require("./mocks/sales.model.mock");

describe("Testes de unidade em SELECT sales", function () {
  describe("Recuperando uma lista com todas as vendas", function () {
    it("Recuperando todas as vendas", async function () {
      sinon.stub(connection, "execute").resolves([salesResponseFromDB]);

      const result = await salesModel.findAll();

      expect(result).to.be.deep.equal(salesResponse);
    });
  });
  describe("Recuperando uma venda e os seus produtos a partir do seu id", function () {
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

  describe("Recuperando uma venda na tabela de junção a partir do seu id", function () {
    it("Recuperando com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([[saleProductResponseFromDB]]);

      const result = await salesModel.findSaleById(2);

      expect(result).to.be.deep.equal([saleProductResponseFromDB]);
    });
    it("Usando um ID inexistente", async function () {
      sinon.stub(connection, "execute").resolves([[]]);

      const result = await salesModel.findSaleById(20);

      expect(result).to.be.deep.equal([]);
    });
  });

  afterEach(sinon.restore);
});

describe("Testes de unidade em INSERT sales", function () {
  describe("Inserindo uma nova venda em sales e sales_products", function () {
    it("Com sucesso", async function () {
      const NEW_PRODUCT_ID = 2;
      const NEW_PRODUCT_QUANTITY = 3;
      sinon
        .stub(connection, "execute")
        .onFirstCall()
        .resolves([{ insertId: 1 }])
        .onSecondCall()
        .resolves([{ insertId: 2 }]);

      const validId = await salesModel.insertSale();
      await salesModel.insertSaleProduct(
        validId,
        NEW_PRODUCT_ID,
        NEW_PRODUCT_QUANTITY
      );

      expect(validId).to.be.deep.equal(1);
    });
  });

  afterEach(sinon.restore);
});

describe("Testes de unidade em UPDATE sales_products", function () {
  describe("Atualizando um produto", function () {
    it("Com sucesso", async function () {
      const NEW_SALE_ID = 1;
      const NEW_PRODUCT_ID = 2;
      const NEW_PRODUCT_QUANTITY = 3;
      const SUCCESSFUL_INSERTION = 1;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await salesModel.updateById(
        NEW_SALE_ID,
        NEW_PRODUCT_ID,
        NEW_PRODUCT_QUANTITY
      );

      expect(result).to.be.deep.equal(SUCCESSFUL_INSERTION);
    });

    it("Sem sucesso", async function () {
      const NEW_SALE_ID = 1;
      const NEW_PRODUCT_ID = 1000;
      const NEW_PRODUCT_QUANTITY = 3;
      const UNSUCCESSFUL_INSERTION = 0;

      sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);

      const result = await salesModel.updateById(
        NEW_SALE_ID,
        NEW_PRODUCT_ID,
        NEW_PRODUCT_QUANTITY
      );

      expect(result).to.be.deep.equal(UNSUCCESSFUL_INSERTION);
    });
  });

  afterEach(sinon.restore);
});

describe("Testes de unidade em DELETE sales_products", function () {
  describe("Deletando uma venda", function () {
    it("Com sucesso", async function () {
      const VALID_ID = 1;
      const SUCCESSFUL_DELETION = 1;
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await salesModel.deleteById(VALID_ID);

      expect(result).to.be.deep.equal(SUCCESSFUL_DELETION);
    });

    it("Sem sucesso", async function () {
      const INVALID_ID = 1000;
      const UNSUCCESSFUL_DELETION = 0;
      sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);

      const result = await salesModel.deleteById(INVALID_ID);

      expect(result).to.be.deep.equal(UNSUCCESSFUL_DELETION);
    });
  });

  afterEach(sinon.restore);
});
