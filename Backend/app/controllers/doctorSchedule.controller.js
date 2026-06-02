const {
    createDoctorScheduleService,
    getDoctorScheduleService,
    updateDoctorScheduleService,
    deleteDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
} = require("../services/doctorSchedule.service");

const createDoctorSchedule = async (req, res) => {
    try {
        const schedule = await createDoctorScheduleService(req);

        res.status(201).json({
            success: true,
            message: "Doctor schedule created successfully",
            data: schedule,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getDoctorSchedule = async (req, res) => {
    try {
        const schedules = await getDoctorScheduleService(req);

        res.status(200).json({
            success: true,
            message: "Doctor schedules fetched successfully",
            data: schedules,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateDoctorSchedule = async (req, res) => {
    try {
        const updatedSchedule = await updateDoctorScheduleService(req);

        res.status(200).json({
            success: true,
            message: "Doctor schedule updated successfully",
            data: updatedSchedule,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteDoctorSchedule = async (req, res) => {
    try {
        const result = await deleteDoctorScheduleService(req);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getDoctorSchedulesByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const schedules = await getDoctorSchedulesByDoctorIdService(doctorId);

        res.status(200).json({
            success: true,
            message: "Doctor schedules fetched successfully",
            data: schedules,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createDoctorSchedule,
    getDoctorSchedule,
    updateDoctorSchedule,
    deleteDoctorSchedule,
    getDoctorSchedulesByDoctorId,
};