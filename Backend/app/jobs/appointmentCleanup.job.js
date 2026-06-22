const cron = require('node-cron');
const {
    cleanupExpiredAppointments,
} = require("../services/appointmentCleanup.service");

const startAppointmentCleanupJob = () => {
    cron.schedule('*/5 * * * *', async () => {
        try {
            await cleanupExpiredAppointments();
        } catch (error) {
            console.error(
                "[AppointmentCleanupJob] Cron failed:",
                error.message
            );
        }
    });

    console.log("[AppointmentCleanupJob] Started. Runs every 5 minutes.");
};


module.exports = {
    startAppointmentCleanupJob,
};