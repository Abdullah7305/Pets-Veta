const marketplaceService = require("../services/marketplace.service");

const getUserId = (req) => {
  return req.user?.id || req.user?.userId;
};

exports.getMarketplaceProducts = async (req, res) => {
  try {
    const products = await marketplaceService.getMarketplaceProducts(req.query);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMarketplaceProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await marketplaceService.getMarketplaceProductById(id);

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.saveListing = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId } = req.params;

    const saved = await marketplaceService.saveListing(userId, productId);

    return res.status(201).json({
      success: true,
      message: "Listing saved successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeSavedListing = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId } = req.params;

    await marketplaceService.removeSavedListing(userId, productId);

    return res.status(200).json({
      success: true,
      message: "Listing removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSavedListings = async (req, res) => {
  try {
    const userId = getUserId(req);

    const listings = await marketplaceService.getSavedListings(userId);

    return res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ... keep existing controller functions ...

// 💡 Step 2: Validate real-time stock levels against the requested quantities
exports.checkProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const quantity = Number(req.query.quantity) || 1;

    const product = await marketplaceService.getMarketplaceProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Max quantity can only be ${product.stock}`,
        availableStock: product.stock,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock is available",
      availableStock: product.stock,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};