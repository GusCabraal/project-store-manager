const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const getSales = async (req, res) => {
  const { message } = await salesService.getSales();

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const createSales = async (req, res) => {
  const { type, message } = await salesService.createSales(req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.updateSale(id, req.body);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(204).send();
};

module.exports = {
  createSales,
  getSaleById,
  getSales,
  deleteSale,
  updateSale,
};
