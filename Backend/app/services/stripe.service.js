const { stripe } = require("../config/stripe");
const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const {
  PaymentStatus,
  AppointmentStatus,
  ScheduleStatus,
} = require("@prisma/client");

const createAppointmentPaymentIntent = async ({ appointmentId, petOwnerId }) => {
  if (!appointmentId || !petOwnerId) {
    throw new AppError("Appointment ID or user ID is missing", 400);
  }

  const appointment = await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      petOwnerId,
    },
    include: {
      doctor: {
        include: {
          user: {
            select: {
              fullName: true,
            },
          },
        },
      },
      doctorSchedule: true,
      payment: true,
    },
  });

  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }

  if (appointment.status !== AppointmentStatus.PENDING_PAYMENT) {
    throw new AppError(
      `Appointment is not ready for payment. Current status is ${appointment.status}`,
      400
    );
  }

  if (appointment.paymentStatus === PaymentStatus.SUCCEEDED) {
    throw new AppError("Payment is already completed for this appointment", 400);
  }

  if (appointment.expiresAt && appointment.expiresAt < new Date()) {
    throw new AppError(
      "Appointment hold has expired. Please select slot again.",
      400
    );
  }

  if (!appointment.petId) {
    throw new AppError("Pet is missing from appointment", 400);
  }

  if (!appointment.petIssueReportId) {
    throw new AppError("Pet issue report is missing from appointment", 400);
  }

  if (
    appointment.doctorSchedule.status !== ScheduleStatus.HELD ||
    appointment.doctorSchedule.lockedByAppointmentId !== appointment.id
  ) {
    throw new AppError("This slot is no longer held for this appointment", 400);
  }

  const stripeAmount = appointment.fees * 100;
  const currency = appointment.currency || "pkr";


  if (
    appointment.payment &&
    appointment.payment.stripePaymentIntentId &&
    appointment.payment.stripeClientSecret &&
    [
      PaymentStatus.PENDING,
      PaymentStatus.REQUIRES_PAYMENT_METHOD,
      PaymentStatus.REQUIRES_ACTION,
      PaymentStatus.PROCESSING,
    ].includes(appointment.payment.status)
  ) {
    return {
      appointmentId: appointment.id,
      paymentId: appointment.payment.id,
      clientSecret: appointment.payment.stripeClientSecret,
      amount: appointment.payment.amount,
      currency: appointment.payment.currency,
      reused: true,
    };
  }

  const metadata = {
    appointmentId: appointment.id,
    doctorId: appointment.doctorId,
    petOwnerId: appointment.petOwnerId,
    petId: appointment.petId,
    petIssueReportId: appointment.petIssueReportId,
    scheduleId: appointment.scheduleId,
  };

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: stripeAmount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Veterinary appointment with Dr. ${appointment.doctor?.user?.fullName || "Doctor"
        }`,
      metadata,
    },
    {
      idempotencyKey: `appointment-payment-${appointment.id}`,
    }
  );

  const payment = await prisma.payment.upsert({
    where: {
      appointmentId: appointment.id,
    },
    update: {
      stripePaymentIntentId: paymentIntent.id,
      stripeClientSecret: paymentIntent.client_secret,
      amount: stripeAmount,
      currency,
      status: PaymentStatus.REQUIRES_PAYMENT_METHOD,
      metadata,
    },
    create: {
      appointmentId: appointment.id,
      userId: petOwnerId,
      stripePaymentIntentId: paymentIntent.id,
      stripeClientSecret: paymentIntent.client_secret,
      amount: stripeAmount,
      currency,
      status: PaymentStatus.REQUIRES_PAYMENT_METHOD,
      metadata,
    },
  });

  await prisma.appointment.update({
    where: {
      id: appointment.id,
    },
    data: {
      paymentStatus: PaymentStatus.REQUIRES_PAYMENT_METHOD,
    },
  });

  return {
    appointmentId: appointment.id,
    paymentId: payment.id,
    clientSecret: paymentIntent.client_secret,
    amount: stripeAmount,
    currency,
    reused: false,
  };
};


const getAppointmentPaymentStatus = async ({ appointmentId, petOwnerId }) => {
  if (!appointmentId || !petOwnerId) {
    throw new AppError("Appointment ID or user ID is missing", 400);
  }

  const appointment = await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      petOwnerId,
    },
    select: {
      id: true,
      doctorId: true,
      petOwnerId: true,
      petId: true,
      petIssueReportId: true,
      scheduleId: true,

      fees: true,
      currency: true,

      status: true,
      paymentStatus: true,

      checkupTime: true,
      expiresAt: true,
      confirmedAt: true,
      createdAt: true,
      updatedAt: true,

      doctor: {
        select: {
          id: true,
          specialization: true,
          user: {
            select: {
              fullName: true,
              email: true,
            },
          },
        },
      },

      doctorSchedule: {
        select: {
          id: true,
          status: true,
          date: true,
          startTime: true,
          endTime: true,
          lockedByAppointmentId: true,
        },
      },

      pet: {
        select: {
          id: true,
          name: true,
          breed: true,
          category: true,
        },
      },

      petIssueReport: {
        select: {
          id: true,
          issue: true,
          createdAt: true,
        },
      },

      payment: {
        select: {
          id: true,
          stripePaymentIntentId: true,
          stripeChargeId: true,
          amount: true,
          currency: true,
          status: true,
          receiptUrl: true,
          failureReason: true,
          paidAt: true,
          cancelledAt: true,
          refundedAt: true,
        },
      },
    },
  });

  if (!appointment) {
    throw new AppError("Appointment not found", 404);
  }

  return appointment;
};


// 💡 Added: Creates a Stripe PaymentIntent specifically for Marketplace Orders
const createOrderPaymentIntent = async ({ orderId, buyerId }) => {
  if (!orderId || !buyerId) {
    throw new AppError("Order ID or user ID is missing", 400);
  }

  const order = await prisma.marketplaceOrder.findFirst({
    where: {
      id: orderId,
      buyerId,
    },
    include: {
      seller: true,
    },
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status !== "PENDING") {
    throw new AppError(
      `Order is not ready for payment. Current status is ${order.status}`,
      400
    );
  }

  if (order.paymentStatus === PaymentStatus.SUCCEEDED) {
    throw new AppError("Payment is already completed for this order", 400);
  }

  // If a Stripe session already exists and is still in a pending state, reuse it
  if (
    order.stripePaymentIntentId &&
    order.stripeClientSecret &&
    [
      PaymentStatus.PENDING,
      PaymentStatus.REQUIRES_PAYMENT_METHOD,
      PaymentStatus.REQUIRES_ACTION,
      PaymentStatus.PROCESSING,
    ].includes(order.paymentStatus)
  ) {
    return {
      orderId: order.id,
      clientSecret: order.stripeClientSecret,
      amount: Math.round(Number(order.totalAmount) * 100),
      currency: "pkr",
      reused: true,
    };
  }

  // Convert decimal total to Stripe cents (int)
  const stripeAmount = Math.round(Number(order.totalAmount) * 100);
  const currency = "pkr";

  const metadata = {
    orderId: order.id,
    buyerId: order.buyerId,
    sellerId: order.sellerId,
    orderNumber: order.orderNumber,
  };

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount: stripeAmount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      description: `Marketplace Purchase: Order #${order.orderNumber} from ${order.seller?.businessName || "Verified Seller"
        }`,
      metadata,
    },
    {
      idempotencyKey: `order-payment-intent-${order.id}`,
    }
  );

  // Save the Stripe session identifiers to the order record
  await prisma.marketplaceOrder.update({
    where: {
      id: order.id,
    },
    data: {
      stripePaymentIntentId: paymentIntent.id,
      stripeClientSecret: paymentIntent.client_secret,
      paymentStatus: PaymentStatus.REQUIRES_PAYMENT_METHOD,
    },
  });

  return {
    orderId: order.id,
    clientSecret: paymentIntent.client_secret,
    amount: stripeAmount,
    currency,
    reused: false,
  };
};

// 💡 Added: Fetches the dynamic transaction status of a marketplace order
const getOrderPaymentStatus = async ({ orderId, buyerId }) => {
  if (!orderId || !buyerId) {
    throw new AppError("Order ID or user ID is missing", 400);
  }

  const order = await prisma.marketplaceOrder.findFirst({
    where: {
      id: orderId,
      buyerId,
    },
    include: {
      seller: {
        include: {
          user: {
            select: {
              fullName: true,
            },
          },
        },
      },
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};
module.exports = {
  createAppointmentPaymentIntent,
  getAppointmentPaymentStatus,
  createOrderPaymentIntent, 
  getOrderPaymentStatus,    
};