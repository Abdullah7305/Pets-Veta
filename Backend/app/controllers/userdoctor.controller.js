const doctorService = require("../services/userdoctor.services");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const sendResponse = require("../utils/sendResponse");

const getApprovedDoctorsForUsers = catchAsync(async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search || "";

  if (page < 1 || limit < 1) {
    throw new AppError("Page and limit must be positive numbers", 400);
  }

  const result = await doctorService.getApprovedDoctorsForUsers({
    page,
    limit,
    search,
  });

  sendResponse(res, 200, "Approved doctors fetched successfully", result);
});

const getDoctorById = catchAsync(async (req, res) => {
  const { doctorId } = req.query;

  if (!doctorId) {
    throw new AppError("Doctor ID is required", 400);
  }

  const doctor = await doctorService.getSpecificDoctor(doctorId);

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  console.log("Doctor Data ==> ", JSON.stringify(doctor, null, 2));

  const transformedDoctor = {
    id: doctor.id,
    name: doctor.user.fullName,
    image: doctor.user.profileImageUrl,
    specialization: doctor.specialization,
    experience: doctor.experience,
    education: doctor.education,
    fees: doctor.fees,
    status: doctor.isAvailable ? "active" : "inactive",
    isVerified: doctor.isVerified,
  };

  return sendResponse(res, 200, "Doctor fetched successfully", transformedDoctor);
})

module.exports = {
  getApprovedDoctorsForUsers,
  getDoctorById
};