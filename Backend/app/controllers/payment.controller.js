const { stripe } = require('../config/stripe');
const prisma = require('../config/prisma');
const { PaymentStatus, AppointmentStatus, ScheduleStatus } = require('@prisma/client');

const stripeWebhook = async (req, res) => {
    console.log("------- STRIPE WEBHOOK DEBUG -------");
    console.log("Secret from process.env:", process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Stripe Signature Header:", req.headers["stripe-signature"] ? "Present ✅" : "Missing ❌");
    let event;
    console.log("Requ3est is ", req.body);
    try {
        const sig = req.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;
    const meta = session.metadata;

    // Defensive Extraction: Ensures your code handles variations or typos seamlessly
    const scheduleId = meta.scheduleId || meta.sechduleId;
    const reportId = meta.issueReportId || meta.reportId;
    const petOwnerId = meta.petOwnerId;
    const doctorId = meta.doctorId;
    const fees = meta.fees;

    try {
        switch (event.type) {

            case "checkout.session.completed": {
                console.log(`\n💳 [Stripe Event] checkout.session.completed received for session: ${session.id}`);
                console.log(`📝 Extracted Metadata Info:`, { scheduleId, petOwnerId, doctorId, reportId, fees });

                console.log(`⏳ [DB Transaction] Starting database operations...`);
                console.log(`   └─ Step 1: Staging a new Appointment record for Pet Owner: ${petOwnerId}`);
                console.log(`   └─ Step 2: Preparing to lock Doctor Schedule Slot: ${scheduleId} to 'BOOKED'`);

                // Execute database updates in an atomic transaction
                const [newAppointment, updatedSchedule] = await prisma.$transaction([

                    // A. Create the official appointment row
                    prisma.appointment.create({
                        data: {
                            doctorId: doctorId,
                            petOwnerId: petOwnerId,
                            petIssueReportId: reportId,
                            scheduleId: scheduleId,
                            fees: parseInt(fees),
                            paymentStatus: PaymentStatus.PAID,
                            status: AppointmentStatus.CONFIRMED,
                        }
                    }),

                    // B. Lock down the schedule slot permanently
                    prisma.doctorSchedule.update({
                        where: { id: scheduleId },
                        data: {
                            status: ScheduleStatus.BOOKED
                        }
                    })
                ]);

                console.log(`✅ [DB Transaction Success]`);
                console.log(`   ├─ 🎉 Appointment successfully created with ID: ${newAppointment.id}`);
                console.log(`   └─ 🔒 Doctor Schedule Slot ${updatedSchedule.id} status updated to: ${updatedSchedule.status}`);
                break;
            }

            case "checkout.session.expired": {
                console.log(`\n⚠️ [Stripe Event] checkout.session.expired received. User abandoned checkout.`);
                console.log(`📝 Extracted Metadata Info for cleanup:`, { scheduleId, reportId });

                console.log(`⏳ [DB Transaction] Starting cleanup operations...`);
                console.log(`   └─ Step 1: Preparing to release Doctor Schedule Slot: ${scheduleId} back to 'AVAILABLE'`);
                console.log(`   └─ Step 2: Preparing to permanently remove unlinked Pet Issue Report: ${reportId}`);

                // Execute cleanup updates in an atomic transaction
                await prisma.$transaction([

                    // A. Revert the schedule slot status back to public availability
                    prisma.doctorSchedule.update({
                        where: { id: scheduleId },
                        data: {
                            status: ScheduleStatus.AVAILABLE
                        }
                    }),

                    // B. Wipe out the temporary issue report since no appointment was generated
                    prisma.petIssueReport.delete({
                        where: { id: reportId }
                    })
                ]);

                console.log(`🗑️ [DB Transaction Success] Cleanup completed completely.`);
                console.log(`   ├─ 🔓 Doctor Schedule Slot ${scheduleId} is free for bookings again.`);
                console.log(`   └─ ❌ Abandoned Pet Issue Report ${reportId} has been deleted from the system.`);
                break;
            }

            default:
                console.log(`ℹ️ Unhandled event type received from Stripe: ${event.type}`);
        }

        // Return 200 OK statement back to Stripe signaling processing completion
        res.status(200).json({ received: true });

    } catch (error) {
        console.error("\n❌ [DB Transaction Failed] Error performing database operations inside webhook:");
        console.error(`🔍 Detailed Error Message: ${error.message}`);

        // We still send 200 to Stripe to stop webhook retries, but we record the database failure locally
        res.status(200).json({ received: true, error: error.message });
    }
};

module.exports = {
    stripeWebhook
};