const express = require('express');
const { salesController } = require('../controllers');
const { validateNewSaleSchema } = require('../middlewares/validation/validationInputValues');

const router = express.Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);
router.post('/', validateNewSaleSchema, salesController.createSales);
router.delete('/:id', salesController.deleteSale);

module.exports = router;
