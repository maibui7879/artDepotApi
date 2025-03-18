const db = require("../config/db");

const Product = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Product");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM Product WHERE id = ?", [id]);
    return rows[0];
  },

  getByCategory: async (category) => {
    const [rows] = await db.query("SELECT * FROM Product WHERE phan_loai = ?", [category]);
    return rows;
  },

  getByName: async (name) => {
    const [rows] = await db.query("SELECT * FROM Product WHERE ten LIKE ?", [`%${name}%`]);
    return rows;
  },
  
  create: async (data) => {
    const { ten, hang, phan_loai, don_gia, anh_minh_hoa_chinh, anh_minh_hoa_phu, xuat_xu, dac_diem, huong_dan_su_dung, huong_dan_bao_quan, so_luong_ton_kho } = data;
    const [result] = await db.query(
      "INSERT INTO Product (ten, hang, phan_loai, don_gia, anh_minh_hoa_chinh, anh_minh_hoa_phu, xuat_xu, dac_diem, huong_dan_su_dung, huong_dan_bao_quan, so_luong_ton_kho) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [ten, hang, phan_loai, don_gia, anh_minh_hoa_chinh, JSON.stringify(anh_minh_hoa_phu), xuat_xu, dac_diem, huong_dan_su_dung, huong_dan_bao_quan, so_luong_ton_kho]
    );
    return result.insertId;
  },

  deleteById: async (id) => {
    const [result] = await db.query("DELETE FROM Product WHERE id = ?", [id]);
    return result.affectedRows;
  },
  updateById: async (id, data) => {
    const { ten, hang, phan_loai, don_gia, anh_minh_hoa_chinh, anh_minh_hoa_phu, xuat_xu, dac_diem, huong_dan_su_dung, huong_dan_bao_quan, so_luong_ton_kho } = data;
    const [result] = await db.query(
      "UPDATE Product SET ten=?, hang=?, phan_loai=?, don_gia=?, anh_minh_hoa_chinh=?, anh_minh_hoa_phu=?, xuat_xu=?, dac_diem=?, huong_dan_su_dung=?, huong_dan_bao_quan=?, so_luong_ton_kho=? WHERE id=?",
      [ten, hang, phan_loai, don_gia, anh_minh_hoa_chinh, JSON.stringify(anh_minh_hoa_phu), xuat_xu, dac_diem, huong_dan_su_dung, huong_dan_bao_quan, so_luong_ton_kho, id]
    );
    return result.affectedRows;
  }
  
};

module.exports = Product;
