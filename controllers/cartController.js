const Cart = require("../models/cartModel");

exports.getAll = async (req, res) => {
  try {
    const carts = await Cart.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const cart = await Cart.getByUserId(req.params.userId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const insertId = await Cart.create(userId, products);
    res.status(201).json({ message: "Cart created successfully", insertId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const result = await Cart.update(userId, products);
    if (result === 0) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteByUserId = async (req, res) => {
  try {
    const result = await Cart.deleteByUserId(req.params.userId);
    if (result === 0) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
