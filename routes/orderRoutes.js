const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.get("/user/:userId", orderController.getByUserId);
router.get("/payment/:paid", orderController.getByPayment);
router.get("/transported/:transported", orderController.getByTransported);
router.get("/user/:userId/:transported/:paid", orderController.getByUserPaymentTransport);
router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;
