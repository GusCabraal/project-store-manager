const express = require('express');
const { productController } = require('../controllers');
const { validateNewProductSchema } = require('../middlewares/validation/validationInputValues');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNewProductSchema, productController.createProduct);
router.put('/:id', validateNewProductSchema, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
