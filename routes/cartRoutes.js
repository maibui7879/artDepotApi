const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAll);
router.get("/:userId", cartController.getByUserId);
router.post("/", cartController.addToCart);
router.delete("/:userId", cartController.deleteCartByUser);
router.delete("/", cartController.removeProduct);
router.delete("/:id", cartController.deleteById);
router.get("/item/:id", cartController.getById);
module.exports = router;
