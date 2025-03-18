const Product = require("../models/productModel");

exports.getAll = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await Product.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const result = await Product.deleteById(req.params.id);
    if (result === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
