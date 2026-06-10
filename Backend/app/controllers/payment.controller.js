const stripe = require("../config/stripe");
const paymentService = require("../services/payment.service");

const createCheckoutSession = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const userId = req.user.id;

    const result = await paymentService.createAppointmentCheckoutSession({
      appointmentId,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Checkout session created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Create checkout session error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create checkout session",
    });
  }
};

const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe webhook verification failed:", error.message);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        await paymentService.handleCheckoutSessionCompleted(session);

        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;

        await paymentService.handleCheckoutSessionExpired(session);

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook handling error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook handling failed",
    });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const result = await paymentService.getPaymentStatusBySessionId({
      sessionId,
      userId,
    });

    return res.status(200).json({
      success: true,
      message: "Payment status fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Get payment status error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get payment status",
    });
  }
};

module.exports = {
  createCheckoutSession,
  stripeWebhook,
  getPaymentStatus,
};