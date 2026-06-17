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
} = require("../controllers/seller.controller");

const { protect } = require("../middleware/auth.middleware");
const upload = require("../config/multer.config");

// Seller Profile
router.post("/profile", protect, createOrUpdateSellerProfile);
router.get("/profile", protect, getMySellerProfile);

// Seller Products
router.post("/product", protect, upload.array("images", 5), createProduct);
router.get("/products", protect, getMyProducts);
router.patch("/product/:id", protect, upload.array("images", 5), updateProduct);
router.delete("/product/:id", protect, deleteProduct);
router.patch("/product/:id/stock", protect, updateProductStock);

// Seller Orders
router.get("/orders", protect, getSellerOrders);

module.exports = router;
