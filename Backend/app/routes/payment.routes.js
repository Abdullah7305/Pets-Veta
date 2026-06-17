const express = require('express');
const Router = express.Router();
const paymentController = require('../controllers/payment.controller');


Router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    paymentController.stripeWebhook
);

module.exports = Router;