const prisma = require('../config/prisma');
const { VerificationStatus, Prisma } = require('@prisma/client');
const AppError = require('../utils/AppError');

const attachDegreeLicenseUrl = (doctor) => ({
  ...doctor,
  degreeLicenseUrl: doctor.user?.doctorCertificate?.publicUrl ?? null
});

const allDoctors = async (limit, page) => {

  const skip = (page - 1) * limit;
  const [doctors, totalCount] = await prisma.$transaction([
    prisma.doctor.findMany({
      skip: skip,
      take: limit,
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        isVerified: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            doctorCertificate: {
              select: {
                publicUrl: true,
                publicId: true
              }
            }
          }
        }

      },
      orderBy: {
        id: 'asc'
      }
    }),
    prisma.doctor.count()
  ])
  return { doctors: doctors.map(attachDegreeLicenseUrl), totalCount };
}

const sendPendingDoctors = async (limit, page) => {
  const skip = (page - 1) * limit;
  const [doctors, totalCount] = await prisma.$transaction([
    prisma.doctor.findMany({
      skip: skip,
      take: limit,
      where: {
        isVerified: VerificationStatus.PENDING,
      },
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        isVerified: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            doctorCertificate: {
              select: {
                publicUrl: true
              }
            }
          },

        }
      },
    }),
    prisma.doctor.count({
      where: {
        isVerified: VerificationStatus.PENDING
      }
    })
  ])
  return { doctors: doctors.map(attachDegreeLicenseUrl), totalCount };

};

const findDoctorById = async (doctorId) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId,
    },
    select: {
      id: true,
      specialization: true,
      education: true,
      experience: true,
      isVerified: true,
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
          doctorCertificate: {
            select: {
              publicUrl: true
            }
          }
        }
      }
    },
  });
  return doctor ? attachDegreeLicenseUrl(doctor) : null;
};

const rejectDoctor = async (doctorId) => {
  let doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    },
    select: {
      userId: true,
      user: {
        select: {
          email: true
        }
      }
    }
  });

  if (!doctor) {
    throw new AppError("No Doctor with Id found", 400)
    return;
  }
  const deletedDoctor = await prisma.user.delete({
    where: {
      id: doctor.userId
    },
    include: {
      doctors: true
    }
  })
  return doctor;
};

const approvedDoctor = async (limit, page) => {
  const skip = (page - 1) * limit;
  const [doctors, totalCount] = await prisma.$transaction([
    prisma.doctor.findMany({
      skip: skip,
      take: limit,
      where: {
        isVerified: VerificationStatus.APPROVED,
      },
      select: {
        id: true,
        specialization: true,
        education: true,
        experience: true,
        isVerified: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            doctorCertificate: {
              select: {
                publicUrl: true
              }
            }
          }
        }
      },
    }),
    prisma.doctor.count({
      where: {
        isVerified: VerificationStatus.APPROVED
      }
    })
  ])
  return { doctors: doctors.map(attachDegreeLicenseUrl), totalCount };
};

const approveupdateDoctor = async (doctorId) => {

  const isDoctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    }
  });

  if (!isDoctor) {
    throw new AppError("Doctor Not Available", 400);
    return;
  }

  return await prisma.doctor.update({
    where: {
      id: doctorId,
    },
    data: {
      isVerified: VerificationStatus.APPROVED,
    },
    select: {
      id: true,
      user: {
        select: {
          email: true
        }
      }
    },
  });
};



const giveDoctorState = async () => {
  const stats = await prisma.$transaction([
    prisma.doctor.count({ where: { isVerified: VerificationStatus.PENDING } }),
    prisma.doctor.count({ where: { isVerified: VerificationStatus.APPROVED } }),
    prisma.doctor.count()
  ])
  return stats;
}
const getDoctorWithCertificate = async (doctorId) => {
  if (!doctorId) {
    throw new AppError("Doctor Id not provided...", 400);
  }
  const doctor = await prisma.doctor.findUnique({
    where: {
      id: doctorId
    }
  })
  if (!doctor) {
    throw new AppError("Doctor Donot exist to delete...", 400)
  }
  const certificate = await prisma.doctorCertificate.findUnique({
    where: {
      userId: doctor.userId
    }

  })

  return certificate;
}

const getAllOrders = async (limit, page, status) => {
  const skip = (page - 1) * limit;
  const where = {};

  if (status && status !== 'ALL') {
    where.status = status;
  }

  const [orders, totalCount] = await prisma.$transaction([
    prisma.marketplaceOrder.findMany({
      where,
      skip: skip,
      take: limit,
      include: {
        buyer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          }
        },
        seller: {
          select: {
            id: true,
            businessName: true,
            city: true,
          }
        },
        items: {
          include: {
            product: {
              include: {
                images: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    }),
    prisma.marketplaceOrder.count({ where })
  ]);

  return { orders, totalCount };
};

module.exports = {
  sendPendingDoctors,
  approvedDoctor,
  rejectDoctor,
  approveupdateDoctor,
  findDoctorById,
  allDoctors,
  giveDoctorState,
  getDoctorWithCertificate,
  getAllOrders
};
