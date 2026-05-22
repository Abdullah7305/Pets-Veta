const { default: prisma } = require('../config/prisma');
const { VerificationStatus } = require('@prisma/client')

const sendPendingDoctors = async () => {
  return await prisma.doctor.findMany({
    where: {
      isVerified: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      specialization: true,
    },
  });
};

const findDoctorById = async (doctorId) => {
  return await prisma.doctor.findUnique({
    where: {
      id: doctorId, 
    },
    select: {
      id: true,
      certificate: true,
      fee: true,
      degree: true,
      education: true,
    },
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
      isVerified: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      specialization: true,

    },
  });
};

module.exports = {
  sendPendingDoctors,
  approvedDoctor,
  rejectDoctor
};