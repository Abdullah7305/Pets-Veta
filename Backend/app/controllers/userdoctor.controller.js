const doctorService = require("../services/userdoctor.service");
const sendResponse = require("../utils/sendResponse");

const getApprovedDoctorsForUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;const doctorService = require("../services/doctor.service");

const getApprovedDoctorsForUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    const result = await doctorService.getApprovedDoctorsForUsers({
      page,
      limit,
      search,
    });

    return res.status(200).json({
      success: true,
      message: "Approved doctors fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    console.error("Get approved doctors error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch approved doctors",
      error: error.message,
    });
  }
};

module.exports = {
  getApprovedDoctorsForUsers,
};
    const search = req.query.search || "";

    const result = await doctorService.getApprovedDoctorsForUsers({
      page,
      limit,
      search,
    });

    return res.status(200).json({
      success: true,
      message: "Approved doctors fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    console.error("Get approved doctors error:", error);

    return sendResponse(res, 500, "Failed to fetch approved doctors", null);
  }
};

module.exports = {
  getApprovedDoctorsForUsers,
};