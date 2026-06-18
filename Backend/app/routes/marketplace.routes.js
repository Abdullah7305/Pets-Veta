const express = require("express");
const router = express.Router();

const {
  getMarketplaceProducts,
  getMarketplaceProductById,
  saveListing,
  getSavedListings,
  removeSavedListing,
} = require("../controllers/marketplace.controller");

const { protect } = require("../middleware/auth.middleware");

// Public Routes
router.get("/products", getMarketplaceProducts);
router.get("/product/:id", getMarketplaceProductById);

// Protected Routes
router.post("/save/:productId", protect, saveListing);
router.delete("/save/:productId", protect, removeSavedListing);
router.get("/saved", protect, getSavedListings);

module.exports = router;