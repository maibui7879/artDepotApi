const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require('./routes/orderRoutes')
const cartRoutes = require("./routes/cartRoutes");
const revenueRoutes = require("./routes/revenueRoutes");
const blogRoutes = require("./routes/blogRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/blog", blogRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
