const cron = require("node-cron");
const {
  cleanupPastUnbookedSchedules,
} = require("../services/scheduleCleanup.service");

const startScheduleCleanupJob = () => {
  /**
   * Har din raat 1 baje run hoga.
   */
  cron.schedule("0 1 * * *", async () => {
    try {
      await cleanupPastUnbookedSchedules();
    } catch (error) {
      console.error("[ScheduleCleanupJob] Cron failed:", error.message);
    }
  });

  console.log("[ScheduleCleanupJob] Started. Runs every day at 1:00 AM.");
};

module.exports = {
  startScheduleCleanupJob,
};