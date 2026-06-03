const {
    createDoctorScheduleService,
    getDoctorScheduleService,
    updateDoctorScheduleService,
    deleteDoctorScheduleService,
    getDoctorSchedulesByDoctorIdService,
} = require("../services/doctorSchedule.service");
const catchAsync = require('../utils/CatchAsync')
const sendResponse = require('../utils/SendResponse')

const createDoctorSchedule = catchAsync(async (req, res) => {

    const schedule = await createDoctorScheduleService(req);

    return sendResponse(res, 201, "Doctor schedule created successfully", data)

})

const getDoctorSchedule = catchAsync(async (req, res) => {

    const schedules = await getDoctorScheduleService(req);

    return sendResponse(res, 200, "Doctor schedules fetched successfully", schedules)

})

const updateDoctorSchedule = catchAsync(async (req, res) => {

    const updatedSchedule = await updateDoctorScheduleService(req);

    return sendResponse(res, 200, "Doctor schedule updated successfully", updatedSchedule)


});

const deleteDoctorSchedule = catchAsync(async (req, res) => {

    const result = await deleteDoctorScheduleService(req);

    return sendResponse(res, 200, "Success", result.message)


});

const getDoctorSchedulesByDoctorId = catchAsync(async (req, res) => {

    const { doctorId } = req.params;

    const schedules = await getDoctorSchedulesByDoctorIdService(doctorId);
    return sendResponse(res, 200, "Doctor schedules fetched successfully", schedules)

});

module.exports = {
    createDoctorSchedule,
    getDoctorSchedule,
    updateDoctorSchedule,
    deleteDoctorSchedule,
    getDoctorSchedulesByDoctorId,
};