const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.createSales);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;
