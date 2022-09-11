const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const { type, message } = await salesService.createSales(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getSales = async (req, res) => {
  const { message } = await salesService.getSales();

  // if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  createSales,
  getSaleById,
  getSales,
};
