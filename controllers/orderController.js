const Order = require("../models/orderModel");

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await Order.getById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const orders = await Order.getByUserId(req.params.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByPayment = async (req, res) => {
  try {
    const orders = await Order.getByPayment(req.params.paid);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByTransported = async (req, res) => {
  try {
    const orders = await Order.getByTransported(req.params.transported);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByUserPaymentTransport = async (req, res) => {
  try {
    const orders = await Order.getByUserPaymentTransport(req.params.userId, req.params.transported, req.params.paid);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await Order.create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await Order.update(req.params.id, req.body);
    if (result === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Order.delete(req.params.id);
    if (result === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
