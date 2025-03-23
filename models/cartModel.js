const db = require("../config/db");

const Cart = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Gio_Hang");
    return rows;
  },

  getByUserId: async (userId, productId) => {
    const [rows] = await db.query("SELECT * FROM Gio_Hang WHERE id_khach_hang = ?", [userId]);
    if (rows.length === 0) return null;
    const cart = rows[0];
    const products = JSON.parse(cart.san_pham);
    const filteredProducts = products.filter((p) => p.id === productId);
    return filteredProducts.length ? filteredProducts : null;
  },

  create: async (userId, products) => {
    const [result] = await db.query("INSERT INTO Gio_Hang (id_khach_hang, san_pham) VALUES (?, ?)", [
      userId,
      JSON.stringify(products),
    ]);
    return result.insertId;
  },

  update: async (userId, products) => {
    const [result] = await db.query("UPDATE Gio_Hang SET san_pham = ? WHERE id_khach_hang = ?", [
      JSON.stringify(products),
      userId,
    ]);
    return result.affectedRows;
  },

  deleteByUserId: async (userId) => {
    const [result] = await db.query("DELETE FROM Gio_Hang WHERE id_khach_hang = ?", [userId]);
    return result.affectedRows;
  },
};

module.exports = Cart;
