const express = require("express");
const paymentController = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/create-checkout-session",
  protect,
  paymentController.createCheckoutSession
);

router.get(
  "/status/:sessionId",
  protect,
  paymentController.getPaymentStatus
);

module.exports = router;