const Cart = require("../models/cartModel");

exports.getAll = async (req, res) => {
  try {
    const carts = await Cart.getAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const cart = await Cart.getByUserId(req.params.userId);
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const insertId = await Cart.create(userId, products);
    res.status(201).json({ message: "Cart created successfully", insertId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const result = await Cart.update(userId, products);
    if (result === 0) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteByUserId = async (req, res) => {
  try {
    const result = await Cart.deleteByUserId(req.params.userId);
    if (result === 0) return res.status(404).json({ error: "Cart not found" });
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const { userId, id, quantity } = req.body;

    // Kiểm tra userId hợp lệ
    if (!userId || !id || !quantity) {
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
    }

    // Lấy thông tin sản phẩm từ database
    const product = await Product.getById(id);
    if (!product) {
      return res.status(404).json({ error: "Sản phẩm không tồn tại" });
    }

    // Chuẩn bị dữ liệu sản phẩm
    const productData = {
      id: product.id,
      name: product.ten,
      quantity,
      price: parseFloat(product.don_gia),
      image: product.anh_minh_hoa_chinh,
    };

    // Lấy giỏ hàng của user
    let cart = await Cart.getByUserId(userId);
    let products = cart ? JSON.parse(cart.san_pham) : [];

    // Kiểm tra sản phẩm đã tồn tại chưa
    const index = products.findIndex((item) => item.id === id);
    if (index !== -1) {
      products[index].quantity += quantity;
    } else {
      products.push(productData);
    }

    // Cập nhật giỏ hàng
    if (cart) {
      await Cart.update(userId, products);
    } else {
      await Cart.create(userId, products);
    }

    res.json({ message: "Sản phẩm đã được thêm vào giỏ hàng" });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
};