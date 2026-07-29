const marketplaceOrderService = require("../services/marketplaceOrder.service");

const getUserId = (req) => {
  return req.user?.id || req.user?.userId;
};

exports.createMarketplaceOrder = async (req, res) => {
  try {
    const buyerId = getUserId(req);

    if (!buyerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const order = await marketplaceOrderService.createMarketplaceOrder(
      buyerId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyMarketplaceOrders = async (req, res) => {
  try {
    const buyerId = getUserId(req);

    const orders = await marketplaceOrderService.getMyMarketplaceOrders(buyerId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ... keep existing imports ...

// 💡 Phase 3: Complete delivery & trigger Connected Payout transfer
exports.completeMarketplaceOrder = async (req, res) => {
  try {
    const buyerId = getUserId(req);
    const { orderId } = req.params;

    if (!buyerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const order = await marketplaceOrderService.completeOrder(buyerId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order successfully completed. Payout released to seller wallet.",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// 💡 Phase 3: Cancel order & process 100% card refund
exports.refundMarketplaceOrder = async (req, res) => {
  try {
    const buyerId = getUserId(req);
    const { orderId } = req.params;

    if (!buyerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const order = await marketplaceOrderService.refundOrder(buyerId, orderId);

    return res.status(200).json({
      success: true,
      message: "Order successfully cancelled. Refund processed back to your card.",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ... keep existing imports ...

// 💡 Void uncompleted checkout order and restore seller stock
exports.cancelPendingMarketplaceOrder = async (req, res) => {
  try {
    const buyerId = getUserId(req);
    const { orderId } = req.params;

    if (!buyerId) {
      return res.status(401).json({ success: false, message: "Unauthorized user" });
    }

    const result = await marketplaceOrderService.cancelPendingOrder(buyerId, orderId);

    return res.status(200).json({
      success: true,
      message: "Unpaid checkout cancelled and stock returned successfully.",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};