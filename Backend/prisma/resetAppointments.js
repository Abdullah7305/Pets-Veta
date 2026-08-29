// Backend/prisma/resetAppointments.js
const { PrismaClient, ScheduleStatus } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetAppointments() {
    console.log("🧹 Starting quick appointment & schedule reset...");

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Delete dependent payment events and payments
            console.log("⏳ Clearing payment records & events...");
            await tx.paymentEvent.deleteMany({});
            await tx.payment.deleteMany({});

            // 2. Delete appointments
            console.log("⏳ Clearing all appointments...");
            await tx.appointment.deleteMany({});

            // 3. Delete pet issue reports submitted during bookings
            console.log("⏳ Clearing pet issue reports...");
            await tx.petIssueReport.deleteMany({});

            // 4. Reset ALL doctor schedule slots back to AVAILABLE and unlock them
            console.log("🔓 Unlocking all doctor schedule slots...");
            await tx.doctorSchedule.updateMany({
                data: {
                    status: ScheduleStatus.AVAILABLE,
                    lockedByUserId: null,
                    lockedByAppointmentId: null,
                    lockedAt: null,
                },
            });
        });

        console.log("✅ All appointments cleared and all doctor slots are now AVAILABLE!");
        console.log("👥 Users, Doctors, Pets, and Roles remain 100% untouched.");
    } catch (error) {
        console.error("❌ Reset failed:", error.message);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

resetAppointments();