const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { productModel } = require("../../../src/models");

const {
  productsResponse,
  productResponse,
} = require("./mocks/product.model.mock");

describe("Testes de unidade em SELECT products", function () {

  describe("Recuperando a lista com todos os produtos", function () {
    it("Recuperando todos os products", async function () {
      sinon.stub(connection, "execute").resolves([productsResponse]);

      const result = await productModel.findAll();
      
      expect(result).to.be.deep.equal(productsResponse);
    });
  })
  describe("Recuperando um produto a partir do seu id", function () {
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
  });
  describe("Recuperando um produto a partir do seu nome", function () {
    it("Recuperando com sucesso", async function () {
      const VALID_NAME = 'Traje';
      sinon.stub(connection, "execute").resolves([[productResponse]]);      
      
      const result = await productModel.findByName(VALID_NAME);
      
      expect(result).to.be.deep.equal([productResponse]);
    });

    it("Usando um nome inexistente", async function () {
      const INVALID_NAME = "Xablau";
      sinon.stub(connection, "execute").resolves([[]]);

      const result = await productModel.findByName(INVALID_NAME);
      
      expect(result).to.be.deep.equal([]);
    });
    it("Não passando um nome e retornando todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([productsResponse]);
      
      const result = await productModel.findByName('');
      
      expect(result).to.be.deep.equal(productsResponse);
    });
  });

  afterEach(sinon.restore);
});

describe("Testes de unidade em INSERT products", function () {
  describe("Inserindo um novo produto", function () {
    it("Com sucesso", async function () {
      const NEW_PRODUCT = 'Calção do Hulk';
      sinon.stub(connection, "execute").resolves([{insertId: 1}]);

      const result = await productModel.insert(NEW_PRODUCT);

      expect(result).to.be.deep.equal({id: 1, name: 'Calção do Hulk'});
    });
  });
  
  afterEach(sinon.restore);
});

describe("Testes de unidade em UPDATE products", function () {
  describe("Atualizando um produto", function () {
    it("Com sucesso", async function () {
      const NEW_PRODUCT = "Calção do Hulk";
      const VALID_ID = 1;
      const SUCCESSFUL_INSERTION = 1;
      sinon.stub(connection, "execute").resolves([{affectedRows: 1}]);

      const result = await productModel.updateById(NEW_PRODUCT, VALID_ID);

      expect(result).to.be.deep.equal(SUCCESSFUL_INSERTION);
    });

    it("Sem sucesso", async function () {
      const NEW_PRODUCT = "Calção do Hulk";
      const INVALID_ID = 100;
      const UNSUCCESSFUL_INSERTION = 0;
      sinon.stub(connection, "execute").resolves([{affectedRows: 0}]);

      const result = await productModel.updateById(NEW_PRODUCT, INVALID_ID);

      expect(result).to.be.deep.equal(UNSUCCESSFUL_INSERTION);
    });
  });
  
  afterEach(sinon.restore);
});

describe("Testes de unidade em DELETE products", function () {
  describe("Deletando um produto", function () {
    it("Com sucesso", async function () {
      const VALID_ID = 1;
      const SUCCESSFUL_DELETION = 1;
      sinon.stub(connection, "execute").resolves([{affectedRows: 1}]);

      const result = await productModel.deleteById(VALID_ID);

      expect(result).to.be.deep.equal(SUCCESSFUL_DELETION);
    });

    it("Sem sucesso", async function () {
      const INVALID_ID = 1000;
      const UNSUCCESSFUL_DELETION = 0;
      sinon.stub(connection, "execute").resolves([{affectedRows: 0}]);

      const result = await productModel.deleteById(INVALID_ID);

      expect(result).to.be.deep.equal(UNSUCCESSFUL_DELETION);
    });

  });
  
  afterEach(sinon.restore);
});