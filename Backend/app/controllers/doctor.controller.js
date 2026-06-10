const sendResponse = require('../utils/SendResponse');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const requireFields = require('../utils/validateRequest');
const authServices = require('../services/auth.services');
const doctorServices = require('../services/doctor.services');
const { uploadToCloudinary } = require('../utils/cloudinary.utils');

const fetchDoctorServices = catchAsync(async (req, res) => {
    const email = req.user.email;
    const validUser = await authServices.verifyEmail(email);

    if (!validUser) {
        throw new AppError("User is Invalid", 400);
    }

    const servicesData = await doctorServices.getDoctorServices(validUser.id);
    return sendResponse(res, 200, "Successfully Fetch Services", servicesData);
});

const createDoctorServicePricing = catchAsync(async (req, res) => {
    const email = req.user.email;

    requireFields(["skill", "price"], req.body);

    const skills = {
        skill: req.body.skill,
        price: req.body.price
    };

    const validUser = await authServices.verifyEmail(email);

    if (!validUser) {
        throw new AppError("User is Invalid", 400);
    }

    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    console.log("Valid User Role is ", validUser.userRole.userId);

    const savedSkills = await doctorServices.addDoctorService(
        skills,
        validUser.userRole.userId
    );

    if (savedSkills === true) {
        return sendResponse(res, 400, "Skill ALready Exist");
    }

    return sendResponse(res, 201, "Success", skills);
});

const deleteDoctorService = catchAsync(async (req, res) => {
    const email = req.user.email;
    const { serviceId } = req.body;

    console.log("Service Id is ", serviceId);

    const validUser = await authServices.verifyEmail(email);

    if (!serviceId) {
        throw new AppError("Service Id not found", 400);
    }

    if (!validUser) {
        throw new AppError("User is Invalid", 400);
    }

    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    const deletedService = await doctorServices.deleteDoctorService(serviceId);

    console.log("Service Delete is ", deletedService);

    return sendResponse(res, 201, "Success", { deletedService });
});

const updateDoctorService = catchAsync(async (req, res) => {
    console.log("Request in edit controlelr ", req.body);

    requireFields(["serviceId", "price", "skill"], req.body);

    const { serviceId, skill, price } = req.body;

    const updateService = await doctorServices.updateDoctorServices(
        serviceId,
        skill,
        price
    );

    console.log("Updated Service", updateService);

    return sendResponse(res, 201, "Updated Service", updateService);
});

const fetchDoctorAppointments = catchAsync(async (req, res) => {
    const appointments = await doctorServices.getDoctorAppointments(req.user.id);

    return sendResponse(
        res,
        200,
        "Doctor appointments fetched successfully",
        appointments
    );
});

const getDoctorProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;

    const doctorProfile = await doctorServices.getDoctorProfile(userId);

    if (!doctorProfile) {
        throw new AppError("Doctor profile not found", 404);
    }

    if (!doctorProfile.doctors) {
        throw new AppError("Doctor data not found", 404);
    }

    return sendResponse(
        res,
        200,
        "Doctor profile fetched successfully",
        doctorProfile
    );
});

const updateDoctorProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const body = req.body || {};

    console.log("Doctor profile update body:", body);
    console.log("Doctor profile update file:", req.file);

    const {
        fullName,
        username,
        phone,
        specialization,
        education,
        experience,
        fees,
        address,
        isAvailable,
    } = body;

    requireFields(
        [
            "fullName",
            "username",
            "phone",
            "specialization",
            "education",
            "experience",
            "fees",
            "address",
            "isAvailable",
        ],
        body
    );

    let profileImageUrl = body.profileImageUrl;

    if (req.file) {
        const uploadedImage = await uploadToCloudinary(
            req.file.buffer,
            "pets-veta/doctor-profile-images"
        );

        profileImageUrl = uploadedImage.secure_url;
    }

    const updatedDoctorProfile = await doctorServices.updateDoctorProfile(
        userId,
        {
            fullName,
            username,
            phone,
            profileImageUrl,
            specialization,
            education,
            experience,
            fees,
            address,
            isAvailable,
        }
    );

    return sendResponse(
        res,
        200,
        "Doctor profile updated successfully",
        updatedDoctorProfile
    );
});

module.exports = {
    createDoctorServicePricing,
    fetchDoctorServices,
    deleteDoctorService,
    updateDoctorService,
    fetchDoctorAppointments,
    getDoctorProfile,
    updateDoctorProfile,
};