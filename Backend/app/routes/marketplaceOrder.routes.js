const express = require("express");
const router = express.Router();

const {
  createMarketplaceOrder,
  getMyMarketplaceOrders,
  completeMarketplaceOrder,
  refundMarketplaceOrder,
   cancelPendingMarketplaceOrder, 
} = require("../controllers/marketplaceOrder.controller");

const { protect } = require("../middleware/auth.middleware");

// Checkout / Place Order
router.post("/", protect, createMarketplaceOrder);

// Buyer Orders
router.get("/my-orders", protect, getMyMarketplaceOrders);

router.post("/:orderId/complete", protect, completeMarketplaceOrder);
router.post("/:orderId/refund", protect, refundMarketplaceOrder);
router.delete("/:orderId/cancel-hold", protect, cancelPendingMarketplaceOrder);

module.exports = router;