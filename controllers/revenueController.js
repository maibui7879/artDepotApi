const Revenue = require("../models/revenueModel");

exports.getAll = async (req, res) => {
  try {
    const total = await Revenue.getAll();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const total = await Revenue.getByUserId(req.params.userId);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const total = await Revenue.getByDay(req.params.day);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByMonth = async (req, res) => {
  try {
    const total = await Revenue.getByMonth(req.params.year, req.params.month);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByYear = async (req, res) => {
  try {
    const total = await Revenue.getByYear(req.params.year);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByProduct = async (req, res) => {
  try {
    const total = await Revenue.getByProduct(req.params.productId);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
