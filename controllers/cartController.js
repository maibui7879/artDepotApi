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
    const carts = await Cart.getByUserId(req.params.userId);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    await Cart.create(userId, productId, quantity);
    res.json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCartByUser = async (req, res) => {
  try {
    await Cart.deleteByUserId(req.params.userId);
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await Cart.deleteProduct(userId, productId);
    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
