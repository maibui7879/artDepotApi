const express = require("express");
const router = express.Router();
const revenueController = require("../controllers/revenueController");

router.get("/", revenueController.getAll);
router.get("/user/:userId", revenueController.getByUserId);
router.get("/day/:day", revenueController.getByDay);
router.get("/month/:year/:month", revenueController.getByMonth);
router.get("/year/:year", revenueController.getByYear);
router.get("/product/:productId", revenueController.getByProduct);

module.exports = router;
