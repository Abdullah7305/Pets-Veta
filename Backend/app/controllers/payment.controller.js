const catchAsync = require("../utils/CatchAsync");
const sendResponse = require("../utils/SendResponse");
const stripeService = require("../services/stripe.service");
const authUtils = require('../utils/auth.utils')
const { stripe } = require("../config/stripe");
const prisma = require("../config/prisma");

const {
  PaymentStatus,
  AppointmentStatus,
  ScheduleStatus,
} = require("@prisma/client");

const createPaymentIntent = catchAsync(async (req, res) => {
  const petOwnerId = req.user?.id;

  if (!petOwnerId) {
    return sendResponse(res, 401, "Please login first", {});
  }

  const appointmentId = req.params.appointmentId || req.body.appointmentId;

  if (!appointmentId) {
    return sendResponse(res, 400, "Appointment ID is required", {});
  }

  const result = await stripeService.createAppointmentPaymentIntent({
    appointmentId,
    petOwnerId,
  });

  return sendResponse(res, 200, "Payment intent created successfully", result);
});

const getPaymentStatus = catchAsync(async (req, res) => {
  const petOwnerId = req.user?.id;

  if (!petOwnerId) {
    return sendResponse(res, 401, "Please login first", {});
  }

  const { appointmentId } = req.params;

  if (!appointmentId) {
    return sendResponse(res, 400, "Appointment ID is required", {});
  }

  const result = await stripeService.getAppointmentPaymentStatus({
    appointmentId,
    petOwnerId,
  });

  return sendResponse(res, 200, "Appointment payment status fetched", result);
});

const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];

    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    const existingEvent = await prisma.paymentEvent.findUnique({
      where: {
        stripeEventId: event.id,
      },
    });

    if (existingEvent?.processed) {
      return res.status(200).json({
        received: true,
        duplicate: true,
      });
    }

    const paymentIntent = event.data.object;
    const appointmentIdFromMetadata = paymentIntent.metadata?.appointmentId;
    const orderIdFromMetadata = paymentIntent.metadata?.orderId;

    const paymentEvent =
      existingEvent ||
      (await prisma.paymentEvent.create({
        data: {
          stripeEventId: event.id,
          eventType: event.type,
          appointmentId: appointmentIdFromMetadata || null,
          stripePaymentIntentId: paymentIntent.id || null,
          payload: event,
          processed: false,
        },
      }));

    if (orderIdFromMetadata) {
      await handleOrderWebhook(event.type, paymentIntent, paymentEvent.id);
      return res.status(200).json({ received: true });
    }


    switch (event.type) {
      case "payment_intent.processing": {
        await handlePaymentIntentProcessing(paymentIntent, paymentEvent.id);
        break;
      }

      case "payment_intent.succeeded": {
        await handlePaymentIntentSucceeded(paymentIntent, paymentEvent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        await handlePaymentIntentFailed(paymentIntent, paymentEvent.id);
        break;
      }

      case "payment_intent.canceled": {
        await handlePaymentIntentCanceled(paymentIntent, paymentEvent.id);
        break;
      }

      default: {
        await prisma.paymentEvent.update({
          where: {
            id: paymentEvent.id,
          },
          data: {
            processed: true,
            processedAt: new Date(),
          },
        });

        console.log(`Unhandled Stripe event type: ${event.type}`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook processing failed:", error);

    return res.status(500).json({
      received: false,
      error: error.message,
    });
  }
};

const handlePaymentIntentProcessing = async (paymentIntent, paymentEventId) => {
  const payment = await prisma.payment.findUnique({
    where: {
      stripePaymentIntentId: paymentIntent.id,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for PaymentIntent ${paymentIntent.id}`);
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.PROCESSING,
      },
    }),

    prisma.appointment.update({
      where: {
        id: payment.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PROCESSING,
        status: AppointmentStatus.PAYMENT_PROCESSING,
      },
    }),

    prisma.paymentEvent.update({
      where: {
        id: paymentEventId,
      },
      data: {
        paymentId: payment.id,
        appointmentId: payment.appointmentId,
        processed: true,
        processedAt: new Date(),
      },
    }),
  ]);
};

const handlePaymentIntentSucceeded = async (paymentIntent, paymentEventId) => {
  const appointmentIdFromMetadata = paymentIntent.metadata?.appointmentId;

  const payment = await prisma.payment.findUnique({
    where: {
      stripePaymentIntentId: paymentIntent.id,
    },
    include: {
      appointment: {
        include: {
          doctorSchedule: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for PaymentIntent ${paymentIntent.id}`);
  }

  if (
    appointmentIdFromMetadata &&
    appointmentIdFromMetadata !== payment.appointmentId
  ) {
    throw new Error(
      "PaymentIntent metadata appointmentId does not match DB payment appointmentId"
    );
  }

  if (payment.amount !== paymentIntent.amount) {
    throw new Error("Payment amount mismatch");
  }

  if (payment.currency.toLowerCase() !== paymentIntent.currency.toLowerCase()) {
    throw new Error("Payment currency mismatch");
  }

  const appointment = payment.appointment;

  await prisma.$transaction(async (tx) => {
    if (appointment.status === AppointmentStatus.CONFIRMED) {
      await tx.paymentEvent.update({
        where: {
          id: paymentEventId,
        },
        data: {
          paymentId: payment.id,
          appointmentId: appointment.id,
          processed: true,
          processedAt: new Date(),
        },
      });

      return;
    }

    if (
      appointment.doctorSchedule.status !== ScheduleStatus.HELD ||
      appointment.doctorSchedule.lockedByAppointmentId !== appointment.id
    ) {
      throw new Error("Schedule is not held by this appointment");
    }

    await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.SUCCEEDED,
        paidAt: new Date(),
        stripeChargeId:
          typeof paymentIntent.latest_charge === "string"
            ? paymentIntent.latest_charge
            : null,
      },
    });

    await tx.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: AppointmentStatus.CONFIRMED,
        paymentStatus: PaymentStatus.SUCCEEDED,
        confirmedAt: new Date(),
      },
    });

    await tx.doctorSchedule.update({
      where: {
        id: appointment.scheduleId,
      },
      data: {
        status: ScheduleStatus.BOOKED,
        lockedByAppointmentId: appointment.id,
      },
    });

    await tx.paymentEvent.update({
      where: {
        id: paymentEventId,
      },
      data: {
        paymentId: payment.id,
        appointmentId: appointment.id,
        processed: true,
        processedAt: new Date(),
      },
    });
  });

  try {
    const fullDetails = await prisma.appointment.findUnique({
      where: { id: appointment.id },
      include: {
        petOwner: { select: { email: true } },
        doctor: { include: { user: { select: { fullName: true } } } }
      }
    });

    if (fullDetails && fullDetails.petOwner?.email) {

      authUtils.sendAppointmentConfirmationEmail(
        fullDetails.petOwner.email,
        {
          doctorName: fullDetails.doctor.user.fullName,
          checkupTime: fullDetails.checkupTime,
          appointmentCode: fullDetails.appointmentCode,
        }
      ).catch(err => console.error("[Webhook Email Dispatch Error]:", err));
    }
  } catch (error) {
    console.error("[Webhook Post-processing Error]:", error);
  }
};

const handlePaymentIntentFailed = async (paymentIntent, paymentEventId) => {
  const payment = await prisma.payment.findUnique({
    where: {
      stripePaymentIntentId: paymentIntent.id,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for PaymentIntent ${paymentIntent.id}`);
  }

  const failureMessage =
    paymentIntent.last_payment_error?.message || "Payment failed";

  await prisma.$transaction([
    prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.FAILED,
        failureReason: failureMessage,
      },
    }),

    prisma.appointment.update({
      where: {
        id: payment.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.FAILED,
        status: AppointmentStatus.PAYMENT_FAILED,
      },
    }),

    prisma.paymentEvent.update({
      where: {
        id: paymentEventId,
      },
      data: {
        paymentId: payment.id,
        appointmentId: payment.appointmentId,
        processed: true,
        processedAt: new Date(),
        processingError: failureMessage,
      },
    }),
  ]);
};

const handlePaymentIntentCanceled = async (paymentIntent, paymentEventId) => {
  const payment = await prisma.payment.findUnique({
    where: {
      stripePaymentIntentId: paymentIntent.id,
    },
    include: {
      appointment: true,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for PaymentIntent ${paymentIntent.id}`);
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.CANCELLED,
        cancelledAt: new Date(),
      },
    }),

    prisma.appointment.update({
      where: {
        id: payment.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.CANCELLED,
        status: AppointmentStatus.EXPIRED,
      },
    }),

    prisma.doctorSchedule.update({
      where: {
        id: payment.appointment.scheduleId,
      },
      data: {
        status: ScheduleStatus.AVAILABLE,
        lockedByUserId: null,
        lockedByAppointmentId: null,
        lockedAt: null,
      },
    }),

    prisma.paymentEvent.update({
      where: {
        id: paymentEventId,
      },
      data: {
        paymentId: payment.id,
        appointmentId: payment.appointmentId,
        processed: true,
        processedAt: new Date(),
      },
    }),
  ]);
};


const createOrderPaymentIntent = catchAsync(async (req, res) => {
  const buyerId = req.user?.id;

  if (!buyerId) {
    return sendResponse(res, 401, "Please login first", {});
  }

  const orderId = req.params.orderId || req.body.orderId;

  if (!orderId) {
    return sendResponse(res, 400, "Order ID is required", {});
  }

  const result = await stripeService.createOrderPaymentIntent({
    orderId,
    buyerId,
  });

  return sendResponse(res, 200, "Order payment intent created successfully", result);
});


const getOrderPaymentStatus = catchAsync(async (req, res) => {
  const buyerId = req.user?.id;

  if (!buyerId) {
    return sendResponse(res, 401, "Please login first", {});
  }

  const { orderId } = req.params;

  if (!orderId) {
    return sendResponse(res, 400, "Order ID is required", {});
  }

  const result = await stripeService.getOrderPaymentStatus({
    orderId,
    buyerId,
  });

  return sendResponse(res, 200, "Order payment status fetched successfully", result);
});


const handleOrderWebhook = async (eventType, paymentIntent, paymentEventId) => {
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) {
    throw new Error("Order ID is missing from PaymentIntent metadata");
  }

  await prisma.$transaction(async (tx) => {
    const order = await tx.marketplaceOrder.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      throw new Error(`Order not found for PaymentIntent metadata ID: ${orderId}`);
    }


    if (order.paymentStatus === "SUCCEEDED" && eventType === "payment_intent.succeeded") {
      await tx.paymentEvent.update({
        where: { id: paymentEventId },
        data: {
          stripePaymentIntentId: paymentIntent.id,
          processed: true,
          processedAt: new Date(),
        },
      });
      return;
    }

    switch (eventType) {
      case "payment_intent.processing": {
        await tx.marketplaceOrder.update({
          where: { id: orderId },
          data: {
            paymentStatus: "PROCESSING",
          },
        });
        break;
      }

      case "payment_intent.succeeded": {
        await tx.marketplaceOrder.update({
          where: { id: orderId },
          data: {
            paymentStatus: "SUCCEEDED",
            status: "CONFIRMED",
          },
        });
        break;
      }

      case "payment_intent.payment_failed": {
        await tx.marketplaceOrder.update({
          where: { id: orderId },
          data: {
            paymentStatus: "FAILED",
          },
        });
        break;
      }

      case "payment_intent.canceled": {
        await tx.marketplaceOrder.update({
          where: { id: orderId },
          data: {
            paymentStatus: "CANCELLED",
            status: "CANCELLED",
          },
        });


        for (const item of order.items) {
          await tx.marketplaceProduct.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
              status: "ACTIVE",
            },
          });
        }
        break;
      }
    }

    await tx.paymentEvent.update({
      where: { id: paymentEventId },
      data: {
        stripePaymentIntentId: paymentIntent.id,
        processed: true,
        processedAt: new Date(),
      },
    });
  });
};

module.exports = {
  createPaymentIntent,
  getPaymentStatus,
  stripeWebhook,
  createOrderPaymentIntent,
  getOrderPaymentStatus,
  handleOrderWebhook
};