const { default: prisma } = require('../config/prisma');
const { VerificationStatus } = require('@prisma/client')

const sendPendingDoctors = async () => {
  return await prisma.doctor.findMany({
    where: {
      isVerified: VerificationStatus.PENDING
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
  return await prisma.doctor.findMany({
    where: {
      isVerified: VerificationStatus.APPROVED
    }
  });
};

module.exports = {
  sendPendingDoctors,
  approvedDoctor,
  rejectDoctor
};