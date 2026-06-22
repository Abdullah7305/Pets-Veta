const prisma = require("../config/prisma");
const { ScheduleStatus } = require("@prisma/client");

const cleanupPastUnbookedSchedules = async () => {
    const now = new Date();

    /**
     * startOfToday:
     * Aaj 00:00 se pehle wali schedules past consider hongi.
     */
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    console.log(
        `[ScheduleCleanup] Running cleanup for schedules before ${startOfToday.toISOString()}`
    );

    const result = await prisma.doctorSchedule.deleteMany({
        where: {
            date: {
                lt: startOfToday,
            },
            status: {
                in: [ScheduleStatus.AVAILABLE, ScheduleStatus.CANCELLED],
            },
            appointments: {
                none: {},
            },
        },
    });

    console.log(`[ScheduleCleanup] Deleted ${result.count} old unbooked schedules.`);

    return {
        deleted: result.count,
        before: startOfToday,
    };
};

module.exports = {
    cleanupPastUnbookedSchedules,
};