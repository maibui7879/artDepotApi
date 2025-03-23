const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getAll);
router.get("/:userId", cartController.getByUserId);
router.post("/", cartController.create);
router.put("/", cartController.update);
router.delete("/:userId", cartController.deleteByUserId);

module.exports = router;
