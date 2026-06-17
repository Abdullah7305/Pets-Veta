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