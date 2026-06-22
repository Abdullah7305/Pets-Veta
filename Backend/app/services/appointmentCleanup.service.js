const prisma = require("../config/prisma");
const { stripe } = require("../config/stripe");

const {
  AppointmentStatus,
  PaymentStatus,
  ScheduleStatus,
} = require("@prisma/client");

const CLEANUP_BATCH_SIZE = 50;

const pendingAppointmentStatuses = [
  AppointmentStatus.PENDING_DETAILS,
  AppointmentStatus.PENDING_REPORT,
  AppointmentStatus.PENDING_PAYMENT,
  AppointmentStatus.PAYMENT_FAILED,
  AppointmentStatus.PAYMENT_PROCESSING,
];

const cancellableStripeStatuses = [
  "requires_payment_method",
  "requires_confirmation",
  "requires_action",
  "requires_capture",
  "processing",
];

const expireAppointmentAndReleaseSlot = async ({
  appointment,
  payment,
  reason = "Appointment expired before payment completion",
}) => {
  await prisma.$transaction(async (tx) => {
    await tx.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: AppointmentStatus.EXPIRED,
        paymentStatus: payment ? PaymentStatus.CANCELLED : PaymentStatus.CANCELLED,
      },
    });

    if (payment) {
      await tx.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: PaymentStatus.CANCELLED,
          cancelledAt: new Date(),
          failureReason: reason,
        },
      });
    }

    /**
     * updateMany use kar rahe hain taake galti se kisi aur confirmed/held slot ko release na kar dein.
     * Sirf wahi schedule release hoga jo isi appointment ne lock kiya tha.
     */
    await tx.doctorSchedule.updateMany({
      where: {
        id: appointment.scheduleId,
        status: ScheduleStatus.HELD,
        lockedByAppointmentId: appointment.id,
      },
      data: {
        status: ScheduleStatus.AVAILABLE,
        lockedByUserId: null,
        lockedByAppointmentId: null,
        lockedAt: null,
      },
    });

    await tx.paymentEvent.create({
      data: {
        eventType: "system.appointment_expired_cleanup",
        paymentId: payment?.id || null,
        appointmentId: appointment.id,
        stripePaymentIntentId: payment?.stripePaymentIntentId || null,
        payload: {
          reason,
          appointmentId: appointment.id,
          scheduleId: appointment.scheduleId,
          expiredAt: new Date().toISOString(),
        },
        processed: true,
        processedAt: new Date(),
      },
    });
  });
};

const confirmAppointmentFromStripePayment = async ({ appointment, payment, paymentIntent }) => {
  await prisma.$transaction(async (tx) => {
    /**
     * Agar already confirmed hai to sirf safely return.
     */
    const latestAppointment = await tx.appointment.findUnique({
      where: {
        id: appointment.id,
      },
      include: {
        doctorSchedule: true,
      },
    });

    if (!latestAppointment) {
      throw new Error(`Appointment not found during cleanup: ${appointment.id}`);
    }

    if (latestAppointment.status === AppointmentStatus.CONFIRMED) {
      return;
    }

    /**
     * Amount/currency verification.
     */
    if (payment.amount !== paymentIntent.amount) {
      throw new Error("Payment amount mismatch during cleanup confirmation");
    }

    if (payment.currency.toLowerCase() !== paymentIntent.currency.toLowerCase()) {
      throw new Error("Payment currency mismatch during cleanup confirmation");
    }

    /**
     * Slot still isi appointment ke naam par HELD hona chahiye.
     */
    if (
      latestAppointment.doctorSchedule.status !== ScheduleStatus.HELD ||
      latestAppointment.doctorSchedule.lockedByAppointmentId !== latestAppointment.id
    ) {
      throw new Error("Schedule is not held by this appointment during cleanup confirmation");
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
        id: latestAppointment.id,
      },
      data: {
        status: AppointmentStatus.CONFIRMED,
        paymentStatus: PaymentStatus.SUCCEEDED,
        confirmedAt: new Date(),
      },
    });

    await tx.doctorSchedule.update({
      where: {
        id: latestAppointment.scheduleId,
      },
      data: {
        status: ScheduleStatus.BOOKED,
        lockedByAppointmentId: latestAppointment.id,
      },
    });

    await tx.paymentEvent.create({
      data: {
        eventType: "system.cleanup_confirmed_succeeded_payment",
        paymentId: payment.id,
        appointmentId: latestAppointment.id,
        stripePaymentIntentId: payment.stripePaymentIntentId,
        payload: {
          reason: "Cleanup found Stripe PaymentIntent already succeeded",
          appointmentId: latestAppointment.id,
          paymentIntentId: paymentIntent.id,
          confirmedAt: new Date().toISOString(),
        },
        processed: true,
        processedAt: new Date(),
      },
    });
  });
};

const markPaymentProcessing = async ({ appointment, payment, paymentIntent }) => {
  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.PROCESSING,
      },
    });

    await tx.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        status: AppointmentStatus.PAYMENT_PROCESSING,
        paymentStatus: PaymentStatus.PROCESSING,
      },
    });

    await tx.paymentEvent.create({
      data: {
        eventType: "system.cleanup_payment_still_processing",
        paymentId: payment.id,
        appointmentId: appointment.id,
        stripePaymentIntentId: payment.stripePaymentIntentId,
        payload: {
          reason: "Cleanup found Stripe PaymentIntent still processing",
          appointmentId: appointment.id,
          paymentIntentId: paymentIntent.id,
          checkedAt: new Date().toISOString(),
        },
        processed: true,
        processedAt: new Date(),
      },
    });
  });
};

const cancelStripePaymentIntentIfPossible = async (paymentIntentId) => {
  if (!paymentIntentId) return null;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    /**
     * succeeded ko kabhi cancel nahi karna.
     */
    if (paymentIntent.status === "succeeded") {
      return paymentIntent;
    }

    /**
     * canceled already hai to same return.
     */
    if (paymentIntent.status === "canceled") {
      return paymentIntent;
    }

    /**
     * Kuch statuses cancellable hotay hain.
     */
    if (cancellableStripeStatuses.includes(paymentIntent.status)) {
      return await stripe.paymentIntents.cancel(paymentIntentId);
    }

    return paymentIntent;
  } catch (error) {
    console.error(
      `Failed to retrieve/cancel Stripe PaymentIntent ${paymentIntentId}:`,
      error.message
    );

    /**
     * Stripe error ki wajah se DB cleanup blindly nahi karna chahte.
     * Isliye error throw kar dete hain.
     */
    throw error;
  }
};

const cleanupExpiredAppointments = async () => {
  const now = new Date();

  console.log(`[AppointmentCleanup] Running cleanup at ${now.toISOString()}`);

  const expiredAppointments = await prisma.appointment.findMany({
    where: {
      status: {
        in: pendingAppointmentStatuses,
      },
      expiresAt: {
        not: null,
        lt: now,
      },
    },
    include: {
      payment: true,
      doctorSchedule: true,
    },
    take: CLEANUP_BATCH_SIZE,
    orderBy: {
      expiresAt: "asc",
    },
  });

  if (!expiredAppointments.length) {
    console.log("[AppointmentCleanup] No expired pending appointments found.");
    return {
      checked: 0,
      expired: 0,
      confirmed: 0,
      processing: 0,
      failed: 0,
    };
  }

  let expired = 0;
  let confirmed = 0;
  let processing = 0;
  let failed = 0;

  for (const appointment of expiredAppointments) {
    try {
      const payment = appointment.payment;

      /**
       * PaymentIntent nahi bani. Simple expire + release slot.
       */
      if (!payment || !payment.stripePaymentIntentId) {
        await expireAppointmentAndReleaseSlot({
          appointment,
          payment: null,
          reason: "Expired before PaymentIntent creation",
        });

        expired += 1;
        continue;
      }

      /**
       * Stripe se latest status check karo.
       */
      const paymentIntent = await stripe.paymentIntents.retrieve(
        payment.stripePaymentIntentId
      );

      if (paymentIntent.status === "succeeded") {
        await confirmAppointmentFromStripePayment({
          appointment,
          payment,
          paymentIntent,
        });

        confirmed += 1;
        continue;
      }

      /**
       * Agar processing hai to slot release mat karo, warna paid payment lose ho sakti hai.
       */
      if (paymentIntent.status === "processing") {
        await markPaymentProcessing({
          appointment,
          payment,
          paymentIntent,
        });

        processing += 1;
        continue;
      }

      /**
       * Baqi unpaid states mein PaymentIntent cancel karke appointment expire.
       */
      const canceledOrLatestIntent = await cancelStripePaymentIntentIfPossible(
        payment.stripePaymentIntentId
      );

      await expireAppointmentAndReleaseSlot({
        appointment,
        payment,
        reason: `Expired cleanup. Stripe PaymentIntent status: ${canceledOrLatestIntent?.status || paymentIntent.status}`,
      });

      expired += 1;
    } catch (error) {
      failed += 1;

      console.error(
        `[AppointmentCleanup] Failed for appointment ${appointment.id}:`,
        error.message
      );

      /**
       * Failure ka log PaymentEvent mein save kar do.
       */
      try {
        await prisma.paymentEvent.create({
          data: {
            eventType: "system.appointment_cleanup_failed",
            paymentId: appointment.payment?.id || null,
            appointmentId: appointment.id,
            stripePaymentIntentId:
              appointment.payment?.stripePaymentIntentId || null,
            payload: {
              error: error.message,
              appointmentId: appointment.id,
              failedAt: new Date().toISOString(),
            },
            processed: false,
            processingError: error.message,
          },
        });
      } catch (logError) {
        console.error(
          `[AppointmentCleanup] Failed to log cleanup error for appointment ${appointment.id}:`,
          logError.message
        );
      }
    }
  }

  const result = {
    checked: expiredAppointments.length,
    expired,
    confirmed,
    processing,
    failed,
  };

  console.log("[AppointmentCleanup] Result:", result);

  return result;
};

module.exports = {
  cleanupExpiredAppointments,
};