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

module.exports = {
  getApprovedDoctorsForUsers,
};