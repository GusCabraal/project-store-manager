const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSaleSchema } = require('../middlewares/validation/validationInputValues');

const router = express.Router();

router.post('/', validateNewSaleSchema, salesController.createSales);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;
