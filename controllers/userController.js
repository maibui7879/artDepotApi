const User = require("../models/userModel");

exports.getAll = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByUsername = async (req, res) => {
  try {
    const user = await User.getByUsername(req.params.username);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("Received data:", req.body); 
    res.status(201).json({ id });
  } catch (error) {
    console.error("Database error:", error); 
    res.status(500).json({ error: error.message }); 
  }
};


exports.update = async (req, res) => {
  try {
    const result = await User.update(req.params.id, req.body);
    if (result === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await User.delete(req.params.id);
    if (result === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
