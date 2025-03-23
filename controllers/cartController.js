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
    const products = await Cart.getByUserId(req.params.userId, req.query.productId);
    if (!products) return res.status(404).json({ error: "No matching products found" });
    res.json(products);
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
exports.updateCart = async (req, res) => {
  try {
    const { userId, products } = req.body;
    if (!userId || !products) {
      return res.status(400).json({ error: "Missing userId or products" });
    }

    const result = await Cart.update(userId, products);
    if (result === 0) return res.status(404).json({ error: "Cart not found" });

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;
    const cart = await Cart.getByUserId(userId);
    let products = cart ? JSON.parse(cart.san_pham) : [];

    const existingProduct = products.find((p) => p.productId === product.productId);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      products.push(product);
    }

    if (cart) {
      await Cart.update(userId, products);
    } else {
      await Cart.create(userId, products);
    }

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.getByUserId(userId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    let products = JSON.parse(cart.san_pham);
    products = products.filter((p) => p.productId !== productId);

    await Cart.update(userId, products);
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};