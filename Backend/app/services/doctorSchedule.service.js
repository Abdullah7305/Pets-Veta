const { default: prisma } = require("../config/prisma");
const AppError = require('../utils/AppError')

const VALID_DAYS = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];

const parseScheduleDate = (value, fieldName) => {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        throw new AppError(`${fieldName} is invalid`, 400);
    }

    return parsedDate;
};

const getDayFromDate = (date) => {
    return VALID_DAYS[date.getDay()];
};

const validateDoctorScheduleInput = ({ day, startTime, endTime }) => {
    if (!day) {
        throw new AppError("Day is required", 400);
    }

    if (!startTime) {
        throw new AppError("Start time is required", 400);
    }

    if (!endTime) {
        throw new AppError("End time is required", 400);
    }

    const normalizedDay = day.toUpperCase();

    if (!VALID_DAYS.includes(normalizedDay)) {
        throw new AppError("Day is invalid", 400);
    }

    const startTimeDate = parseScheduleDate(startTime, "Start time");
    const endTimeDate = parseScheduleDate(endTime, "End time");

    if (startTimeDate >= endTimeDate) {
        throw new AppError("Start time must be before end time", 400);
    }

    const selectedDateDay = getDayFromDate(startTimeDate);

    if (selectedDateDay !== normalizedDay) {
        throw new AppError("Selected day does not match selected date", 400);
    }

    return {
        day: normalizedDay,
        startTimeDate,
        endTimeDate,
    };
};

const getLoggedInDoctor = async (req) => {
    const userId = req.user.id;

    const doctor = await prisma.doctor.findUnique({
        where: { userId },
    });

    if (!doctor) {
        throw new AppError("Doctor not found", 400);
    }

    return doctor;
};

const createDoctorScheduleService = async (req) => {
    const doctor = await getLoggedInDoctor(req);
    const { day, startTime, endTime } = req.body;

    const validatedSchedule = validateDoctorScheduleInput({
        day,
        startTime,
        endTime,
    });

    const schedule = await prisma.doctorSchedule.create({
        data: {
            doctorId: doctor.id,
            date: validatedSchedule.startTimeDate,
            day: validatedSchedule.day,
            startTime: validatedSchedule.startTimeDate,
            endTime: validatedSchedule.endTimeDate,
        },
    });

    return schedule;
};

const getDoctorScheduleService = async (req) => {
    const doctor = await getLoggedInDoctor(req);

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

const updateDoctorScheduleService = async (req) => {
    const doctor = await getLoggedInDoctor(req);
    const { id } = req.params;
    const { day, startTime, endTime } = req.body;

    const schedule = await prisma.doctorSchedule.findUnique({
        where: { id },
    });

    if (!schedule) {
        throw new AppError("Schedule not found", 400);
    }

    if (schedule.doctorId !== doctor.id) {
        throw new AppError("You are not allowed to update this schedule", 400);
    }

    const validatedSchedule = validateDoctorScheduleInput({
        day: day || schedule.day,
        startTime: startTime || schedule.startTime,
        endTime: endTime || schedule.endTime,
    });

    const updatedData = {
        day: validatedSchedule.day,
        date: validatedSchedule.startTimeDate,
        startTime: validatedSchedule.startTimeDate,
        endTime: validatedSchedule.endTimeDate,
    };

    const updatedSchedule = await prisma.doctorSchedule.update({
        where: { id },
        data: updatedData,
    });

    return updatedSchedule;
};

const deleteDoctorScheduleService = async (req) => {
    const doctor = await getLoggedInDoctor(req);
    const { id } = req.params;

    const schedule = await prisma.doctorSchedule.findUnique({
        where: { id },
    });

    if (!schedule) {
        throw new AppError("Schedule not found", 400);
    }

    if (schedule.doctorId !== doctor.id) {
        throw new AppError("You are not allowed to delete this schedule", 400);
    }

    await prisma.doctorSchedule.delete({
        where: { id },
    });

    return {
        message: "Schedule deleted successfully",
    };
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
    updateDoctorScheduleService,
    deleteDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
};
