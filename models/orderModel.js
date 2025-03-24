const db = require("../config/db");

const Order = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Don_Hang");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM Don_Hang WHERE id = ?", [id]);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM Don_Hang WHERE id_khach_hang = ?", [userId]);
    return rows;
  },

  getByPayment: async (paid) => {
    const [rows] = await db.query("SELECT * FROM Don_Hang WHERE da_thanh_toan = ?", [paid]);
    return rows;
  },

  getByTransported: async (transported) => {
    const [rows] = await db.query("SELECT * FROM Don_Hang WHERE da_van_chuyen = ?", [transported]);
    return rows;
  },

  getByUserPaymentTransport: async (userId, transported, paid) => {
    const [rows] = await db.query(
      "SELECT * FROM Don_Hang WHERE id_khach_hang = ? AND da_van_chuyen = ? AND da_thanh_toan = ?",
      [userId, transported, paid]
    );
    return rows;
  },

  create: async (data) => {
    const { id_khach_hang, ngay_thanh_toan, list_hang, gia_tien, da_van_chuyen, da_thanh_toan, dia_chi_nhan_hang } = data;
    const [result] = await db.query(
      "INSERT INTO Don_Hang (id_khach_hang, ngay_thanh_toan, list_hang, gia_tien, da_van_chuyen, da_thanh_toan, dia_chi_nhan_hang) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id_khach_hang, ngay_thanh_toan, JSON.stringify(list_hang), gia_tien, da_van_chuyen, da_thanh_toan, dia_chi_nhan_hang]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { ngay_thanh_toan, list_hang, gia_tien, da_van_chuyen, da_thanh_toan, dia_chi_nhan_hang } = data;
    const [result] = await db.query(
      "UPDATE Don_Hang SET ngay_thanh_toan=?, list_hang=?, gia_tien=?, da_van_chuyen=?, da_thanh_toan=?, dia_chi_nhan_hang=? WHERE id=?",
      [ngay_thanh_toan, JSON.stringify(list_hang), gia_tien, da_van_chuyen, da_thanh_toan, dia_chi_nhan_hang, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM Don_Hang WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = Order;
