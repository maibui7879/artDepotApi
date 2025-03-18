const db = require("../config/db");

const User = {
  getAll: async () => {
    const [rows] = await db.query("SELECT id, ten, username, so_dien_thoai, email, ngay_sinh, dia_chi FROM Users");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT id, ten, username, so_dien_thoai, email, ngay_sinh, dia_chi FROM Users WHERE id = ?", [id]);
    return rows[0];
  },

  getByUsername: async (username) => {
    const [rows] = await db.query("SELECT id, ten, username, so_dien_thoai, email, ngay_sinh, dia_chi FROM Users WHERE username = ?", [username]);
    return rows[0];
  },

  create: async (data) => {
    const { ten, username, password, so_dien_thoai, email, ngay_sinh, dia_chi } = data;
    const [result] = await db.query(
      "INSERT INTO Users (ten, username, password, so_dien_thoai, email, ngay_sinh, dia_chi) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ten, username, password, so_dien_thoai, email, ngay_sinh, dia_chi]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { ten, username, so_dien_thoai, email, ngay_sinh, dia_chi } = data;
    const [result] = await db.query(
      "UPDATE Users SET ten=?, username=?, so_dien_thoai=?, email=?, ngay_sinh=?, dia_chi=? WHERE id=?",
      [ten, username, so_dien_thoai, email, ngay_sinh, dia_chi, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM Users WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = User;
