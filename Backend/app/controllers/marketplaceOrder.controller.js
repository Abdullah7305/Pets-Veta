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