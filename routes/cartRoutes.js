const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAll);
router.get("/:userId", cartController.getByUserId);
router.post("/", cartController.addToCart);
router.delete("/:userId", cartController.deleteCartByUser);
router.delete("/", cartController.removeProduct);

module.exports = router;
