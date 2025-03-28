const db = require("../config/db");

const Cart = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM cart");
    return rows;
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM cart WHERE userId = ?", [userId]);
    return rows;
  },

  create: async (userId, productId, quantity) => {
    await db.query(
      "INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?",
      [userId, productId, quantity, quantity]
    );
  },

  deleteByUserId: async (userId) => {
    await db.query("DELETE FROM cart WHERE userId = ?", [userId]);
  },

  deleteProduct: async (userId, productId) => {
    await db.query("DELETE FROM cart WHERE userId = ? AND productId = ?", [userId, productId]);
  },

  deleteById: async (id) => {
    const [result] = await db.query("DELETE FROM cart WHERE id = ?", [id]);
    return result.affectedRows > 0; 
  }
};
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM cart WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  }

module.exports = Cart;
