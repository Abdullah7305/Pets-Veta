const prisma = require('../config/prisma')
const { PaymentStatus } = require('@prisma/client')


const addDoctorService = async (skills, userId) => {
    console.log("Skills are ", skills, userId);

    let isExisting = false;

    const doSkillExist = await prisma.doctorSkill.findFirst({
        where: {
            userId: userId,
            skill: {
                equals: skills.skill,
                mode: 'insensitive'
            }
        }
    });

    if (doSkillExist) {
        isExisting = true;
        return isExisting;
    }

    const newSkills = await prisma.doctorSkill.create({
        data: {
            skill: skills.skill,
            price: skills.price,
            userId: userId
        },
    });

    return newSkills;
};


const deleteDoctorService = async (serviceId) => {
    const deletedSkill = await prisma.doctorSkill.delete({
        where: {
            id: serviceId
        }
    });

    return deletedSkill;
};


const getDoctorServices = async (userId) => {
    const services = await prisma.doctorSkill?.findMany({
        where: {
            userId: userId
        }
    });

    if (!services) {
        return false;
    }

    return services;
};

const updateDoctorServices = async (serviceId, skill, price) => {
    const updatedService = await prisma.doctorSkill.update({
        where: {
            id: serviceId
        },
        data: {
            price: price,
            skill: skill
        }
    });

    return updatedService;
};


const getDoctorAppointments = async (userId) => {
    console.log("User id is ",userId)
    const doctor = await prisma.doctor.findUnique({
        where: {
            userId,
        },
        select: {
            id: true,
        },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }
    console.log("Doctor for appointment is ", doctor)
    const appointment = await prisma.appointment.findMany({
        where: {
            doctorId: doctor.id,
            paymentStatus: PaymentStatus.SUCCEEDED
        },
        orderBy: {
            checkupTime: "asc",
        },
        select: {
            id: true,
            fees: true,
            checkupTime: true,
            status: true,
            petIssueReport: {
                select: {
                    id: true,
                    issue: true,
                    user: {
                        select: {
                            fullName: true,
                            email: true,
                            phone: true,
                            profileImageUrl: true,
                        },
                    },
                    pet: {
                        select: {
                            id: true,
                            name: true,
                            age: true,
                            breed: true,
                            category: true,
                        },
                    },
                },
            },
        },
    });
    console.log("Appointein service is ", appointment);
    return appointment;
};


const getDoctorProfile = async (userId) => {
    const doctorProfile = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            profileImageUrl: true,
            isActive: true,
            doctors: {
                select: {
                    id: true,
                    specialization: true,
                    education: true,
                    experience: true,
                    fees: true,
                    address: true,
                    isAvailable: true,
                    isVerified: true,
                },
            },
        },
    });

    return doctorProfile;
};

const updateDoctorProfile = async (userId, profileData) => {
    const {
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
    } = profileData;

    const existingUsername = await prisma.user.findFirst({
        where: {
            username,
            NOT: {
                id: userId,
            },
        },
    });

    if (existingUsername) {
        throw new Error("Username already exists");
    }

    const userUpdateData = {
        fullName,
        username,
        phone,
    };

    if (profileImageUrl) {
        userUpdateData.profileImageUrl = profileImageUrl;
    }

    const updatedProfile = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...userUpdateData,

            doctors: {
                update: {
                    specialization,
                    education,
                    experience: Number(experience),
                    fees: Number(fees),
                    address,
                    isAvailable: isAvailable === true || isAvailable === "true",
                },
            },
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            profileImageUrl: true,
            isActive: true,
            doctors: {
                select: {
                    id: true,
                    specialization: true,
                    education: true,
                    experience: true,
                    fees: true,
                    address: true,
                    isAvailable: true,
                    isVerified: true,
                },
            },
        },
    });

    return updatedProfile;
};

const completeAppointment = async (appointmentId, userId) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            userId
        },
        select: {
            id: true
        }
    });

    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }

    const appointment = await prisma.appointment.findFirst({
        where: {
            id: appointmentId,
            doctorId: doctor.id
        }
    });

    if (!appointment) {
        throw new AppError("Appointment not found or unauthorized", 404);
    }

    if (appointment.status === "COMPLETED") {
        throw new AppError("This appointment is already completed.", 400);
    }

    const updatedAppointment = await prisma.appointment.update({
        where: {
            id: appointmentId
        },
        data: {
            status: "COMPLETED",
            completedAt: new Date()
        }
    });

    return updatedAppointment;
};

module.exports = {
    addDoctorService,
    deleteDoctorService,
    getDoctorServices,
    updateDoctorServices,
    getDoctorAppointments,
    getDoctorProfile,
    updateDoctorProfile,
    completeAppointment
};