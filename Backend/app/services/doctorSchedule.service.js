const prisma = require("../config/prisma");
const requireFields = require('../utils/validateRequest')
const AppError = require('../utils/AppError')


const createDoctorScheduleService = async (req) => {
    const userId = req.user.id;
    const doctor = await prisma.doctor.findUnique({
        where: {
            userId: userId
        }
    })

    if (!doctor) {
        throw new AppError("Doctor is Not Valid", 400);
    }
    if (!doctor.stripeOnboardingCompleted) {
        throw new AppError("Please complete your Stripe Connect setup in your profile before configuring scheduling availability.", 400);
    }
    const doctorId = doctor.id;

    requireFields(["date", "startTime", "endTime"], req.body);
    const { date, startTime, endTime } = req.body;



    const startDateTime = new Date(`${date}T${startTime}:00Z`);
    const endDateTime = new Date(`${date}T${endTime}:00Z`);



    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        throw new AppError("Invalid date or time format provided", 400);
    }

    const durationInMs = endDateTime.getTime() - startDateTime.getTime();
    const totalHours = Math.floor(durationInMs / (1000 * 60 * 60));

    if (totalHours < 1) {
        throw new AppError("Availability block must be at least 1 hour", 400);
    }

    const slots = Array.from({ length: totalHours }).map((_, index) => {
        const slotStart = new Date(startDateTime.getTime() + index * 60 * 60 * 1000);
        const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);
        return {
            doctorId,
            date: new Date(`${date}T00:00:00Z`),
            startTime: slotStart,
            endTime: slotEnd,

        };
    });

    const result = await prisma.doctorSchedule.createMany({
        data: slots,
        skipDuplicates: true
    });

    return result;
};

const getDoctorScheduleService = async (req) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            userId: req.user.id
        }
    });

    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0); // Normalize time to midnight

    // 1. Query slots starting from today onwards to eliminate past clutter
    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: doctor.id,
            startTime: {
                gte: startOfToday
            }
        },
        orderBy: {
            startTime: "asc",
        },
    });

    // 2. Map database schema fields cleanly to the boolean properties expected by the frontend
    const mappedSchedules = schedules.map(item => ({
        ...item,
        isBooked: item.status === "BOOKED"
    }));

    return mappedSchedules;
};


const getDoctorSchedulesByDoctorIdService = async (doctorId) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
    });

    if (!doctor) {
        throw new AppError("Doctor not found", 400);
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: doctor.id,
            startTime: {
                gte: startOfToday
            }
        },
        orderBy: {
            startTime: "asc",
        },
    });

    const mappedSchedules = schedules.map(item => ({
        ...item,
        isBooked: item.status === "BOOKED"
    }));

    return mappedSchedules;
};

module.exports = {
    createDoctorScheduleService,
    getDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
};
