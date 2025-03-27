const Blog = require("../models/blogModel");

exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách blog" ,error});
  }
};

exports.getById = async (req, res) => {
  try {
    const blog = await Blog.getById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog không tồn tại" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy blog" });
  }
};

exports.create = async (req, res) => {
  try {
    const id = await Blog.create(req.body);
    res.status(201).json({ message: "Blog đã được tạo", id });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo blog" });
  }
};

exports.update = async (req, res) => {
  try {
    await Blog.update(req.params.id, req.body);
    res.json({ message: "Blog đã được cập nhật" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật blog" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Blog.delete(req.params.id);
    res.json({ message: "Blog đã được xóa" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa blog" });
  }
};
