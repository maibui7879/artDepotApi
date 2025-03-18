const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", productController.create);
router.delete("/:id", productController.deleteById);

module.exports = router;
