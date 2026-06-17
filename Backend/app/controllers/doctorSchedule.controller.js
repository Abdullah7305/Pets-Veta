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
    console.log("Doctor Request is ", req.body);
    const schedule = await createDoctorScheduleService(req);

    if (schedule) {
        console.log("Schedule is ", schedule);
        return sendResponse(res, 201, "Doctor schedule created successfully", schedule)
    }

    return sendResponse(res, 400, "Error in Creating Doctor Schedule", schedule)
})

const getDoctorSchedule = catchAsync(async (req, res) => {

    const schedules = await getDoctorScheduleService(req);

    return sendResponse(res, 200, "Doctor schedules fetched successfully", schedules)

})



const getDoctorSchedulesByDoctorId = catchAsync(async (req, res) => {

    const { doctorId } = req.params;

    const schedules = await getDoctorSchedulesByDoctorIdService(doctorId);
    return sendResponse(res, 200, "Doctor schedules fetched successfully", schedules)

});

module.exports = {
    createDoctorSchedule,
    getDoctorSchedule,
    getDoctorSchedulesByDoctorId,
};