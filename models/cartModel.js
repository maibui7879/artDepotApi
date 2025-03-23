const db = require("../config/db");

const Cart = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM cart");
    return rows; // Trả về trực tiếp danh sách sản phẩm
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
  delete: async (userId, productId) => {
    await db.query("DELETE FROM cart WHERE id = ?", [id]);
  }
};

module.exports = Cart;
