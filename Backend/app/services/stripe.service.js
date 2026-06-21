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

  // Agar pehle se PaymentIntent bana hua hai to same clientSecret return karo.
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
      description: `Veterinary appointment with Dr. ${
        appointment.doctor?.user?.fullName || "Doctor"
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

module.exports = {
  createAppointmentPaymentIntent,
};