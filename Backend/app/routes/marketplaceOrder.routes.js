const express = require("express");
const router = express.Router();

const {
  createMarketplaceOrder,
  getMyMarketplaceOrders,
} = require("../controllers/marketplaceOrder.controller");

const { protect } = require("../middleware/auth.middleware");

// Checkout / Place Order
router.post("/", protect, createMarketplaceOrder);

// Buyer Orders
router.get("/my-orders", protect, getMyMarketplaceOrders);

module.exports = router;