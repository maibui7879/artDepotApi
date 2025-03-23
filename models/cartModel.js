const db = require("../config/db");

const Cart = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Gio_Hang");
    return rows;
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM Gio_Hang WHERE id_khach_hang = ?", [userId]);
    return rows.length ? rows[0] : null;
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

  addProductToCart: async (userId, product) => {
    const cart = await Cart.getByUserId(userId);
    let products = cart ? JSON.parse(cart.san_pham) : [];

    const existingProduct = products.find((p) => p.id === product.id);
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
  },

  deleteByUserId: async (userId) => {
    const [result] = await db.query("DELETE FROM Gio_Hang WHERE id_khach_hang = ?", [userId]);
    return result.affectedRows;
  },
};

module.exports = Cart;
