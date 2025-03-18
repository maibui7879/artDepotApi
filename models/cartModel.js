const db = require("../config/db");

const Cart = {
  getByUserId: async (userId, productId) => {
    const [rows] = await db.query("SELECT * FROM Gio_Hang WHERE id_khach_hang = ?", [userId]);
    if (rows.length === 0) return null;
    const cart = rows[0];
    const products = JSON.parse(cart.san_pham);
    const filteredProducts = products.filter((p) => p.id === productId);
    return filteredProducts.length ? filteredProducts : null;
  },

  deleteByUserId: async (userId) => {
    const [result] = await db.query("DELETE FROM Gio_Hang WHERE id_khach_hang = ?", [userId]);
    return result.affectedRows;
  },
};

module.exports = Cart;
