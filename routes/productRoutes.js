const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/category/:category", productController.getByCategory);
router.get("/subcategory/:subcategory", productController.getBySubCategory);
router.get("/brand/:brand", productController.getByBrand);
router.get("/categories", productController.getCategories);
router.get("/subcategories", productController.getSubCategories);
router.get("/brands", productController.getBrands);
router.get("/:id", productController.getById);
router.get("/", productController.getAll);
router.post("/", productController.create);
router.delete("/:id", productController.deleteById);
router.put("/:id", productController.updateById);

module.exports = router;
