const doctorServices = require('../services/admin.services');
const sendResponse = require('../utils/SendResponse');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');


const pendingDoctorList = catchAsync(async (req, res) => {
    const pendingDoctors = await doctorServices.sendPendingDoctors();

    if (!pendingDoctors || pendingDoctors.length === 0) {
        return sendResponse(res, 200, 'No Pending Doctors Found', []);
    }

    return sendResponse(res, 200, 'Success', pendingDoctors);
});

const approveDoctor = catchAsync(async (req, res) => {
    requireFields(['doctorId'], req.body);

    const { doctorId } = req.body;

    const doctorExist = await doctorServices.findDoctorById(doctorId);

    if (!doctorExist) {
        throw new AppError('Doctor not found', 404);
    }

    const approvedDoctor = await doctorServices.approvedDoctor(doctorId);

    return sendResponse(
        res,
        200,
        'Successfully approved doctor',
        approvedDoctor
    );
});

const rejectDoctor = catchAsync(async (req, res) => {
    requireFields(['doctorId'], req.body);

    const { doctorId } = req.body;

    const doctorExist = await doctorServices.findDoctorById(doctorId);

    if (!doctorExist) {
        throw new AppError('Doctor not found', 404);
    }

    const rejectedDoctor = await doctorServices.rejectDoctor(doctorId);

    return sendResponse(
        res,
        200,
        'Successfully rejected doctor',
        rejectedDoctor
    );
});

module.exports = {
    pendingDoctorList,
    approveDoctor,
    rejectDoctor
};