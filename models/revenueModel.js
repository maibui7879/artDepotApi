const db = require("../config/db");

const Revenue = {
  getAll: async () => {
    const [rows] = await db.query("SELECT SUM(gia_tien) AS total_revenue FROM Don_Hang WHERE da_thanh_toan = TRUE");
    return rows[0].total_revenue || 0;
  },

  getByUserId: async (userId) => {
    const [rows] = await db.query("SELECT SUM(gia_tien) AS total_revenue FROM Don_Hang WHERE id_khach_hang = ? AND da_thanh_toan = TRUE", [userId]);
    return rows[0].total_revenue || 0;
  },

  getByDay: async (day) => {
    const [rows] = await db.query("SELECT SUM(gia_tien) AS total_revenue FROM Don_Hang WHERE DATE(ngay_thanh_toan) = ? AND da_thanh_toan = TRUE", [day]);
    return rows[0].total_revenue || 0;
  },

  getByMonth: async (year, month) => {
    const [rows] = await db.query("SELECT SUM(gia_tien) AS total_revenue FROM Don_Hang WHERE YEAR(ngay_thanh_toan) = ? AND MONTH(ngay_thanh_toan) = ? AND da_thanh_toan = TRUE", [year, month]);
    return rows[0].total_revenue || 0;
  },

  getByYear: async (year) => {
    const [rows] = await db.query("SELECT SUM(gia_tien) AS total_revenue FROM Don_Hang WHERE YEAR(ngay_thanh_toan) = ? AND da_thanh_toan = TRUE", [year]);
    return rows[0].total_revenue || 0;
  },

  getByProduct: async (productId) => {
    const [rows] = await db.query(`
      SELECT SUM(JSON_EXTRACT(list_hang, '$."${productId}"') * gia_tien) AS total_revenue 
      FROM Don_Hang 
      WHERE JSON_CONTAINS_PATH(list_hang, 'one', '$."${productId}"') 
      AND da_thanh_toan = TRUE`, []);
    return rows[0].total_revenue || 0;
  }
};

module.exports = Revenue;
