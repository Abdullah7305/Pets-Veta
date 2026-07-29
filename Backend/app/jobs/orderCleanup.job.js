const cron = require('node-cron');
const {
    cleanupExpiredMarketplaceOrders,
} = require("../services/orderCleanup.service");

const startOrderCleanupJob = () => {
    // Standard cron expression: Evaluates every 5 minutes to identify uncompleted holds
    cron.schedule('*/5 * * * *', async () => {
        try {
            await cleanupExpiredMarketplaceOrders();
        } catch (error) {
            console.error(
                "[OrderCleanupJob] Automated execution failed:",
                error.message
            );
        }
    });

    console.log("[OrderCleanupJob] Active. Runs every 5 minutes.");
};

module.exports = {
    startOrderCleanupJob,
};