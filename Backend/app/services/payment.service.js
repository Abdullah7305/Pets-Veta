const prisma = require("../config/prisma");
const stripe = require("../config/stripe");

const createAppointmentCheckoutSession = async ({ appointmentId, userId }) => {
  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
    include: {
      petIssueReport: true,
      doctor: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.petIssueReport.petOwnerId !== userId) {
    throw new Error("You are not allowed to pay for this appointment");
  }

  if (appointment.paymentStatus === "PAID") {
    throw new Error("This appointment is already paid");
  }

  if (appointment.status === "CANCELLED") {
    throw new Error("Cannot pay for a cancelled appointment");
  }

  const amount = appointment.fees * 100;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        price_data: {
          currency: appointment.currency || "usd",
          product_data: {
            name: "Pets Veta Doctor Appointment",
            description: `Appointment with Dr. ${appointment.doctor.user.fullName}`,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment/cancel?appointmentId=${appointment.id}`,

    metadata: {
      appointmentId: appointment.id,
      doctorId: appointment.doctorId,
      petIssueReportId: appointment.petIssueReportId,
      petOwnerId: appointment.petIssueReport.petOwnerId,
    },
  });

  await prisma.appointment.update({
    where: {
      id: appointment.id,
    },
    data: {
      stripeSessionId: session.id,
      paymentStatus: "PENDING",
      status: "PENDING",
    },
  });

  return {
    sessionId: session.id,
    url: session.url,
  };
};

const handleCheckoutSessionCompleted = async (session) => {
  const appointmentId = session.metadata?.appointmentId;

  if (!appointmentId) {
    throw new Error("Appointment ID missing in Stripe metadata");
  }

  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.paymentStatus === "PAID") {
    return appointment;
  }

  const updatedAppointment = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      paymentStatus: "PAID",
      status: "CONFIRMED",
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
    },
  });

  return updatedAppointment;
};

const handleCheckoutSessionExpired = async (session) => {
  const appointmentId = session.metadata?.appointmentId;

  if (!appointmentId) {
    return null;
  }

  const appointment = await prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });

  if (!appointment) {
    return null;
  }

  if (appointment.paymentStatus === "PAID") {
    return appointment;
  }

  const updatedAppointment = await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      paymentStatus: "FAILED",
      status: "PENDING",
    },
  });

  return updatedAppointment;
};

const getPaymentStatusBySessionId = async ({ sessionId, userId }) => {
  const appointment = await prisma.appointment.findFirst({
    where: {
      stripeSessionId: sessionId,
      petIssueReport: {
        petOwnerId: userId,
      },
    },
    select: {
      id: true,
      fees: true,
      checkupTime: true,
      status: true,
      paymentStatus: true,
      stripeSessionId: true,
      stripePaymentIntentId: true,
      doctor: {
        select: {
          id: true,
          user: {
            select: {
              fullName: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!appointment) {
    throw new Error("Payment record not found");
  }

  return appointment;
};

module.exports = {
  createAppointmentCheckoutSession,
  handleCheckoutSessionCompleted,
  handleCheckoutSessionExpired,
  getPaymentStatusBySessionId,
};