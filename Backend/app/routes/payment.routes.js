const express = require("express");
const Router = express.Router();

const paymentController = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth.middleware");

Router.post(
    "/appointments/:appointmentId/create-payment-intent",
    protect,
    paymentController.createPaymentIntent
);

Router.get(
    "/appointments/:appointmentId/status",
    protect,
    paymentController.getPaymentStatus
);


Router.post(
    "/orders/:orderId/create-payment-intent",
    protect,
    paymentController.createOrderPaymentIntent
);

Router.get(
    "/orders/:orderId/status",
    protect,
    paymentController.getOrderPaymentStatus
);

module.exports = Router;