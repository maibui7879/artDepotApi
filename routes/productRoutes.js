const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/category/:category", productController.getByCategory);
router.get("/search", productController.getByName);
router.get("/:id", productController.getById);
router.get("/", productController.getAll);
router.post("/", productController.create);
router.delete("/:id", productController.deleteById);

module.exports = router;
