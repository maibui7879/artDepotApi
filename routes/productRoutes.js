const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.get("/category/:category", productController.getByCategory);
router.get("/search", productController.getByName);
router.post("/", productController.create);
router.delete("/:id", productController.deleteById);

module.exports = router;
