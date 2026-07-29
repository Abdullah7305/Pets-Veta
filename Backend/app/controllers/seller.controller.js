const sellerService = require("../services/seller.service");
const { uploadToCloudinary } = require("../utils/cloudinary.utils");

const getUserId = (req) => {
  return req.user?.id || req.user?.userId;
};

const sendSellerError = (res, error) => {
  const message =
    error.code === "P2002" || error.message?.includes("Invalid `prisma")
      ? "Unable to save seller information. Please try again."
      : error.message || "Something went wrong";

  return res.status(500).json({
    success: false,
    message,
  });
};

const uploadProductImages = async (files = []) => {
  const uploadedImages = [];

  for (const file of files) {
    const uploadedImage = await uploadToCloudinary(
      file.buffer,
      "pets-veta/marketplace-products"
    );

    uploadedImages.push({
      publicUrl: uploadedImage.secure_url,
      publicId: uploadedImage.public_id,
    });
  }

  return uploadedImages;
};

exports.createOrUpdateSellerProfile = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // 1. Clone body parameters to build our payload
    const payload = { ...req.body };

    // 2. If a brand logo file is attached, upload it to Cloudinary
    if (req.file) {
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "pets-veta/seller-logos"
      );
      payload.storeLogo = uploadedImage.secure_url;
    }

    // 3. Save profile metrics in the database
    const profile = await sellerService.createOrUpdateSellerProfile(
      userId,
      payload
    );

    return res.status(200).json({
      success: true,
      message: "Seller profile saved successfully",
      data: profile,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.getMySellerProfile = async (req, res) => {
  try {
    const userId = getUserId(req);

    const profile = await sellerService.getMySellerProfile(userId);

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const userId = getUserId(req);
    const uploadedImages = await uploadProductImages(req.files);
    const payload = req.body || {};

    const product = await sellerService.createProduct(userId, {
      ...payload,
      images: uploadedImages,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const userId = getUserId(req);

    const products = await sellerService.getMyProducts(userId);

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const uploadedImages = await uploadProductImages(req.files);
    const payload = req.body || {};

    const product = await sellerService.updateProduct(userId, id, {
      ...payload,
      images: uploadedImages,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    await sellerService.deleteProduct(userId, id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.updateProductStock = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { stock } = req.body;

    const product = await sellerService.updateProductStock(userId, id, stock);

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: product,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const userId = getUserId(req);

    const orders = await sellerService.getSellerOrders(userId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return sendSellerError(res, error);
  }
};


// ... keep existing controller functions ...

// 💡 Phase 2: Initiate Seller Stripe onboarding link creation
exports.initiateSellerStripeOnboarding = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const result = await sellerService.setupSellerStripeConnect(userId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 💡 Phase 2: Verify real-time status details of Connected Account
exports.checkSellerStripeConnectStatus = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const result = await sellerService.getSellerStripeConnectStatus(userId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
