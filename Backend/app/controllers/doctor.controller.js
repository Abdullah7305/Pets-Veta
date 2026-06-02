const sendResponse = require('../utils/SendResponse');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/CatchAsync');
const requireFields = require('../utils/validateRequest')
const authServices = require('../services/auth.services');
const doctorServices = require('../services/doctor.services');


const fetchDoctorServices = catchAsync(async (req, res) => {
    const email = req.user.email;
    const validUser = await authServices.verifyEmail(email);

    if (!validUser) {
        throw new AppError("User is Invalid", 400)
    }

    const servicesData = await doctorServices.getDoctorServices(validUser.id);
    return sendResponse(res, 200, "Successfully Fetch Services", servicesData);
})


const createDoctorServicePricing = catchAsync(async (req, res) => {

    const email = req.user.email;
    requireFields(["skill", "price"], req.body);

    const skills = {
        skill: req.body.skill,
        price: req.body.price
    }

    const validUser = await authServices.verifyEmail(email);
    if (!validUser) {
        throw new AppError("User is Invalid", 400)
    }
    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    console.log("Valid User Role is ", validUser.userRole.userId);
    const savedSkills = await doctorServices.addDoctorService(skills, validUser.userRole.userId);
    if (savedSkills === true) {
        return sendResponse(res, 400, "Skill ALready Exist",)
    }

    return sendResponse(res, 201, "Success", skills);
})

const deleteDoctorService = catchAsync(async (req, res) => {
    const email = req.user.email;
    const { serviceId } = req.body;
    console.log("Service Id is ", serviceId);
    const validUser = await authServices.verifyEmail(email);
    if (!serviceId) {
        throw new AppError("Service Id not found", 400)
    }
    if (!validUser) {
        throw new AppError("User is Invalid", 400)
    }
    if (validUser.userRole.role !== 'Doctor') {
        throw new AppError("Role is Invalid", 401);
    }

    const deletedService = await doctorServices.deleteDoctorService(serviceId);
    console.log("Service Delete is ", deletedService);

    return sendResponse(res, 201, "Success", { deletedService: deletedService })

})

const updateDoctorService = catchAsync(async (req, res) => {
    console.log("Request in edit controlelr ", req.body);
    requireFields(["serviceId", "price", "skill"], req.body);

    const { serviceId, skill, price } = req.body;
    const updateService = await doctorServices.updateDoctorServices(serviceId, skill, price);
    console.log("Updated Service", updateService);

    return sendResponse(res, 201, "Updated Service", updateService);

})

module.exports = {
    createDoctorServicePricing,
    fetchDoctorServices,
    deleteDoctorService,
    updateDoctorService
}