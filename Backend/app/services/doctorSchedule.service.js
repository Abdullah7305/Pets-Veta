const { default: prisma } = require("../config/prisma");
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
    const doctorId = doctor.id;

    requireFields(["date", "startTime", "endTime"], req.body);
    const { date, startTime, endTime } = req.body;


    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);



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
    const doctorId = doctor.id
    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: doctor.id,
        },
        orderBy: {
            startTime: "asc",
        },
    });
    console.log('Schedule is ', schedules);
    return schedules;
};


const getDoctorSchedulesByDoctorIdService = async (doctorId) => {
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
    });

    if (!doctor) {
        throw new AppError("Doctor not found", 400);
    }

    const schedules = await prisma.doctorSchedule.findMany({
        where: {
            doctorId: doctor.id,
        },
        orderBy: {
            startTime: "asc",
        },
    });

    return schedules;
};

module.exports = {
    createDoctorScheduleService,
    getDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
};
