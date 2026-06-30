const doctorServices = require('../services/admin.services');
const sendResponse = require('../utils/SendResponse');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/AppError');
const requireFields = require('../utils/validateRequest');
const authUtils = require('../utils/auth.utils');
const cloudinaryUtils = require('../utils/cloudinary.utils');


const allDoctorList = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    console.log("Limit and Page is ", limit, page);


    const { doctors, totalCount } = await doctorServices.allDoctors(limit, page);

    if (!doctors || doctors.length === 0) {
        return sendResponse(res, 200, 'No  Doctors Found', []);
    }

    return sendResponse(res, 200, 'Success', { doctors, totalCount });
});



const pendingDoctorList = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const { doctors, totalCount } = await doctorServices.sendPendingDoctors(limit, page);

    if (!doctors || doctors.length === 0) {
        return sendResponse(res, 200, 'No Pending Doctors Found', []);
    }

    return sendResponse(res, 200, 'Success', { doctors, totalCount });
});



const approvedDoctor = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const { doctors, totalCount } = await doctorServices.approvedDoctor(limit, page);
    if (!doctors || doctors.length === 0) {
        return sendResponse(res, 200, 'No Approved Doctors Found', []);
    }
    return sendResponse(
        res,
        200,
        'Approved doctors Send',
        { doctors, totalCount }
    );
});



const rejectDoctor = catchAsync(async (req, res) => {
    console.log("Req.body", req.body);
    requireFields(['doctorId'], req.body);

    const { doctorId } = req.body;

    const certificate = await doctorServices.getDoctorWithCertificate(doctorId);
    console.log("Certificate", certificate);
    const deleteFromCloudinary = await cloudinaryUtils.deleteFromCloudinary(certificate.publicId);
    console.log("Delete Status is ", deleteFromCloudinary);

    const rejectedDoctor = await doctorServices.rejectDoctor(doctorId);
    console.log("rejected Doctor is ", rejectedDoctor);
    authUtils.sendStatusEmail(rejectedDoctor.user.email, "rejected")
        .then((mesg) => {
            console.log("Otp Mesg", mesg)
        })
        .catch((err) => {
            console.log("Error is sending the OTP");
        })
    return sendResponse(
        res,
        200,
        'Successfully rejected doctor',
        {}
    );
});



const approveupdateDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.body;
    console.log("Htting", doctorId);
    if (!doctorId) {
        return sendResponse(res, 400, "No Doctor Id");
    }

    const approvedDoctor = await doctorServices.approveupdateDoctor(doctorId);
    authUtils.sendStatusEmail(approvedDoctor.user.email, "approved")
        .then((mesg) => {
            console.log("Otp Mesg", mesg)
        })
        .catch((err) => {
            console.log("Error is sending the OTP");
        })

    return sendResponse(res, 200, "Doctor approved successfully", {
        status: "approved",
        doctor: approvedDoctor,
    });
});



const fetchDoctorStats = catchAsync(async (req, res) => {
    if (!req.user) {
        throw new AppError("User is not valid", 400)
    }

    const stats = await doctorServices.giveDoctorState();
    const processedStats = {
        pending: stats[0],
        approved: stats[1],
        total: stats[2]
    }

    sendResponse(res, 200, "Doctor Stats", processedStats);

});

const allOrderList = catchAsync(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const status = req.query.status || 'ALL';

    const { orders, totalCount } = await doctorServices.getAllOrders(limit, page, status);

    if (!orders || orders.length === 0) {
        return sendResponse(res, 200, 'No Orders Found', { orders: [], totalCount: 0 });
    }

    return sendResponse(res, 200, 'Success', { orders, totalCount });
});

module.exports = {
    pendingDoctorList,
    approvedDoctor,
    rejectDoctor,
    approveupdateDoctor,
    allDoctorList,
    fetchDoctorStats,
    allDoctorList,
    allOrderList
};