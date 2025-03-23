const db = require("../config/db");

const Cart = {
  getAll: () => db.query("SELECT * FROM cart"),

  getByUserId: (userId) => db.query("SELECT * FROM cart WHERE userId = ?", [userId]),

  create: (userId, productId, quantity) =>
    db.query("INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?", 
      [userId, productId, quantity, quantity]),

  deleteByUserId: (userId) => db.query("DELETE FROM cart WHERE userId = ?", [userId]),

  deleteProduct: (userId, productId) => db.query("DELETE FROM cart WHERE userId = ? AND productId = ?", [userId, productId])
};

module.exports = Cart;
