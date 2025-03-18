const db = require("../config/db");

const Blog = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Blog");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM Blog WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (blog) => {
    const { anh_minh_hoa, title, short_description, content, tac_gia } = blog;
    const [result] = await db.query(
      "INSERT INTO Blog (anh_minh_hoa, title, short_description, content, tac_gia) VALUES (?, ?, ?, ?, ?)",
      [anh_minh_hoa, title, short_description, content, tac_gia]
    );
    return result.insertId;
  },

  update: async (id, blog) => {
    const { anh_minh_hoa, title, short_description, content, tac_gia } = blog;
    await db.query(
      "UPDATE Blog SET anh_minh_hoa = ?, title = ?, short_description = ?, content = ?, tac_gia = ? WHERE id = ?",
      [anh_minh_hoa, title, short_description, content, tac_gia, id]
    );
  },

  delete: async (id) => {
    await db.query("DELETE FROM Blog WHERE id = ?", [id]);
  }
};

module.exports = Blog;
