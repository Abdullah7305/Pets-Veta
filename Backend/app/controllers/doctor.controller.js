const sendResponse = require('../utils/SendResponse');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const requireFields = require('../utils/validateRequest')
const authServices = require('../services/auth.services');
const doctorServices = require('../services/doctor.services');



const doctorServicePricing = catchAsync(async (req, res) => {
    const email = req.user.email;
    requireFields(["skill", "price"], req.body);
    const skills = {
        skill: req.body.skill,
        price: req.body.price
    }

    const validUser = await authServices.verifyEmail(email);
    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    console.log("Valid User Role is ", validUser.userRole.userId);
    const savedSkills = await doctorServices.addDoctorService(skills, validUser.userRole.userId);

    sendResponse(res, 200, "Success", {});
})

module.exports = {
    doctorServicePricing
}