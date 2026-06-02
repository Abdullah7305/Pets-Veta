const { default: prisma } = require("../config/prisma");

const getLoggedInDoctor = async (req) => {
    const userId = req.user.id;

    const doctor = await prisma.doctor.findUnique({
        where: { userId },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    return doctor;
};

const createDoctorScheduleService = async (req) => {
    const doctor = await getLoggedInDoctor(req);
    const { day, startTime, endTime } = req.body;

    if (!day) {
        throw new Error("Day is required");
    }

    if (!startTime) {
        throw new Error("Start time is required");
    }

    if (!endTime) {
        throw new Error("End time is required");
    }

    if (new Date(startTime) >= new Date(endTime)) {
        throw new Error("Start time must be before end time");
    }

    const schedule = await prisma.doctorSchedule.create({
        data: {
            doctorId: doctor.id,
            day,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
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
        throw new Error("Schedule not found");
    }

    if (schedule.doctorId !== doctor.id) {
        throw new Error("You are not allowed to update this schedule");
    }

    if (startTime && endTime) {
        if (new Date(startTime) >= new Date(endTime)) {
            throw new Error("Start time must be before end time");
        }
    }

    const updatedSchedule = await prisma.doctorSchedule.update({
        where: { id },
        data: {
            day: day || undefined,
            startTime: startTime ? new Date(startTime) : undefined,
            endTime: endTime ? new Date(endTime) : undefined,
        },
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
        throw new Error("Schedule not found");
    }

    if (schedule.doctorId !== doctor.id) {
        throw new Error("You are not allowed to delete this schedule");
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
        throw new Error("Doctor not found");
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