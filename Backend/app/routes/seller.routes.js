const express = require("express");
const router = express.Router();

const {
  createOrUpdateSellerProfile,
  getMySellerProfile,
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  updateProductStock,
  getSellerOrders,
  initiateSellerStripeOnboarding,
  checkSellerStripeConnectStatus,
} = require("../controllers/seller.controller");

const { protect } = require("../middleware/auth.middleware");
const upload = require("../config/multer.config");


router.post("/profile", protect, upload.single("storeLogo"), createOrUpdateSellerProfile); // 💡 Updated: Added multer upload processing
router.get("/profile", protect, getMySellerProfile);


router.post("/product", protect, upload.array("images", 5), createProduct);
router.get("/products", protect, getMyProducts);
router.patch("/product/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/product/:id", protect, deleteProduct);

router.patch("/product/:id/stock", protect, updateProductStock);


router.get("/orders", protect, getSellerOrders);

router.get("/connect/onboarding", protect, initiateSellerStripeOnboarding);
router.get("/connect/status", protect, checkSellerStripeConnectStatus);

module.exports = router;
