const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel, productModel } = require("../../../src/models");
const { salesService, productService } = require("../../../src/services");
const { salesResponse, saleResponse } = require("./mocks/sales.service.mock");
const {
  otherProductResponse,
  productResponse,
} = require("./mocks/product.service.mock");

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

describe("Verificando as funções de escrita no service sales", function () {
  describe("Cadastrando um nova venda", function () {
    it("com sucesso", async function () {
      const NEW_SALE = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      const SUCCESSFUL_INSERTION_SALE = 5;
      const SUCCESSFUL_INSERTION_SALE_PRODUCT = 42;
      const OTHER_SUCCESSFUL_INSERTION_SALE_PRODUCT = 43;

      sinon.stub(productModel, "findById")
        .onFirstCall()
        .resolves([otherProductResponse])
        .onSecondCall()
        .resolves([productResponse]);

      sinon.stub(salesModel, "insertSale").resolves(SUCCESSFUL_INSERTION_SALE);

      sinon
        .stub(salesModel, "insertSaleProduct")
        .onFirstCall()
        .resolves(SUCCESSFUL_INSERTION_SALE_PRODUCT)
        .onSecondCall()
        .resolves(OTHER_SUCCESSFUL_INSERTION_SALE_PRODUCT);

      const products = await salesService.createSales(NEW_SALE);

      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal({
        id: 5,
        itemsSold: NEW_SALE,
      });
    });
    it("passando um produto que não existe", async function () {
      const NEW_SALE = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 200,
          quantity: 5,
        },
      ];

      sinon.stub(productModel, "findById")
        .onFirstCall()
        .resolves([otherProductResponse])
        .onSecondCall()
        .resolves([]);

      const products = await salesService.createSales(NEW_SALE);

      expect(products.type).to.equal('PRODUCT_NOT_FOUND');
      expect(products.message).to.be.deep.equal("Product not found");
    });
    it("passando um array vazio no body", async function () {
      const NEW_SALE = [];
      
      const products = await salesService.createSales(NEW_SALE);

      expect(products.type).to.equal('PRODUCT_NOT_FOUND');
      expect(products.message).to.be.deep.equal("Product not found");
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});
describe("Verificando as funções de atualização no service sales", function () {
  describe("Atualizando uma venda", function () {
    it("com sucesso", async function () {
      const NEW_SALE = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      const SALE_TO_UPDATE = 1;
      const SUCCESSFUL_UPDATE_SALE = 1;

      sinon
        .stub(productModel, "findById")
        .onFirstCall()
        .resolves([otherProductResponse])
        .onSecondCall()
        .resolves([productResponse]);

      sinon
        .stub(salesModel, "updateById")
        .onFirstCall()
        .resolves(SUCCESSFUL_UPDATE_SALE)
        .onSecondCall()
        .resolves(SUCCESSFUL_UPDATE_SALE);

      const products = await salesService.updateSale(SALE_TO_UPDATE, NEW_SALE);

      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal({
        saleId: SALE_TO_UPDATE,
        itemsUpdated: NEW_SALE,
      });
    });
    it("passando um produto que não existe", async function () {
      const NEW_SALE = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 200,
          quantity: 5,
        },
      ];
      const SALE_TO_UPDATE = 1;

      sinon
        .stub(productModel, "findById")
        .onFirstCall()
        .resolves([otherProductResponse])
        .onSecondCall()
        .resolves([]);

      const products = await salesService.updateSale(SALE_TO_UPDATE, NEW_SALE);

      expect(products.type).to.equal("PRODUCT_NOT_FOUND");
      expect(products.message).to.be.deep.equal("Product not found");
    });
    it("passando uma venda que não existe", async function () {
      const NEW_SALE = [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      const SALE_TO_UPDATE = 100;
      const SUCCESSFUL_UPDATE_SALE = 1;
      const UNSUCCESSFUL_UPDATE_SALE = 0;

      sinon
        .stub(productModel, "findById")
        .onFirstCall()
        .resolves([otherProductResponse])
        .onSecondCall()
        .resolves([productResponse]);

      sinon
        .stub(salesModel, "updateById")
        .onFirstCall()
        .resolves(SUCCESSFUL_UPDATE_SALE)
        .onSecondCall()
        .resolves(UNSUCCESSFUL_UPDATE_SALE);

      const products = await salesService.updateSale(SALE_TO_UPDATE, NEW_SALE);

      expect(products.type).to.equal("SALE_NOT_FOUND");
      expect(products.message).to.be.deep.equal("Sale not found");
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});

describe("Verificando as funções de deleção no service sale", function () {
  describe("Deletando uma venda", function () {
    it("com sucesso", async function () {
      const VALID_ID = 1;
      const SUCCESSFUL_DELETION = 1;
      sinon.stub(salesModel, "deleteById").resolves(SUCCESSFUL_DELETION);

      const products = await salesService.deleteSale(VALID_ID);

      expect(products.type).to.equal(null);
      expect(products.message).to.be.deep.equal({});
    });

    it("sem sucesso", async function () {
      const INVALID_ID = 1000;
      const UNSUCCESSFUL_DELETION = 0;
      sinon.stub(salesModel, "deleteById").resolves(UNSUCCESSFUL_DELETION);

      const products = await salesService.deleteSale(INVALID_ID);

      expect(products.type).to.equal("SALE_NOT_FOUND");
      expect(products.message).to.equal("Sale not found");
    });
    afterEach(function () {
      sinon.restore();
    });
  });
});
