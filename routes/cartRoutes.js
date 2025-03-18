const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:userId", cartController.getByUserId);
router.delete("/:userId", cartController.deleteByUserId);

module.exports = router;
