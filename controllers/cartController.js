const Cart = require("../models/cartModel");

exports.getByUserId = async (req, res) => {
  try {
    const products = await Cart.getByUserId(req.params.userId, req.query.productId);
    if (!products) return res.status(404).json({ error: "No matching products found" });
    res.json(products);
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
