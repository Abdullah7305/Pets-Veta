const { default: prisma } = require('../config/prisma');

const sendPendingDoctors = async () => {
  return await prisma.doctor.findMany({
    where: {
      isVerified: false
    }
  });
};

const findDoctorById = async (doctorId) => {
  return await prisma.doctor.findUnique({
    where: {
      id: doctorId
    }
  });
};

const rejectDoctor = async (doctorId) => {
  return await prisma.doctor.delete({
    where: {
      id: doctorId
    }
  });
};

const approvedDoctor = async (doctorId) => {
  return await prisma.doctor.update({
    where: {
      id: doctorId
    },
    data: {
      isVerified: true
    }
  });
};

module.exports = {
  sendPendingDoctors,
  approvedDoctor,
  rejectDoctor
};