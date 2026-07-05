const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');
const {
    ScheduleStatus,
    AppointmentStatus,
    PaymentStatus
} = require('@prisma/client');

const DEFAULT_USER_BIO =
    "Manage your pets, veterinary appointments, and health information from one place.";

const saveUserPet = async (pet) => {
    const newPet = await prisma.pet.create({
        data: {
            petOwnerId: pet.petOwnerId,
            name: pet.name,
            age: pet.age,
            breed: pet.breed,
            category: pet.category
        }
    });

    return newPet;
};

const registerPetIssue = async (petIssue) => {
    if (!petIssue) {
        throw new AppError("Registration data not found", 400);
    }

    const { appointmentId, petId, issue, petOwnerId } = petIssue;

    if (!appointmentId || !petId || !issue || !petOwnerId) {
        throw new AppError("Appointment, pet, issue, or user id is missing", 400);
    }

    const result = await prisma.$transaction(async (tx) => {
        const appointment = await tx.appointment.findFirst({
            where: {
                id: appointmentId,
                petOwnerId
            },
            include: {
                doctorSchedule: true
            }
        });

        if (!appointment) {
            throw new AppError("Appointment not found", 404);
        }

        if (
            appointment.status !== AppointmentStatus.PENDING_DETAILS &&
            appointment.status !== AppointmentStatus.PENDING_REPORT &&
            appointment.status !== AppointmentStatus.PENDING_PAYMENT
        ) {
            throw new AppError("This appointment is not available for report submission", 400);
        }

        if (appointment.expiresAt && appointment.expiresAt < new Date()) {
            throw new AppError("This appointment hold has expired. Please select the slot again.", 400);
        }

        if (
            appointment.doctorSchedule.status !== ScheduleStatus.HELD ||
            appointment.doctorSchedule.lockedByAppointmentId !== appointment.id
        ) {
            throw new AppError("This slot is no longer held for your appointment", 400);
        }

        const pet = await tx.pet.findFirst({
            where: {
                id: petId,
                petOwnerId
            }
        });

        if (!pet) {
            throw new AppError("Invalid pet selected", 400);
        }

        let registerIssue;

        if (appointment.petIssueReportId) {
            registerIssue = await tx.petIssueReport.findUnique({
                where: {
                    id: appointment.petIssueReportId
                }
            });
        } else {
            registerIssue = await tx.petIssueReport.create({
                data: {
                    petOwnerId,
                    petId,
                    issue
                }
            });
        }

        if (!registerIssue) {
            throw new AppError("Issue in creating pet report", 400);
        }

        const holdMinutes = Number(process.env.APPOINTMENT_HOLD_MINUTES || 15);
        const newExpiresAt = new Date(Date.now() + holdMinutes * 60 * 1000);

        const updatedAppointment = await tx.appointment.update({
            where: {
                id: appointment.id
            },
            data: {
                petId,
                petIssueReportId: registerIssue.id,
                status: AppointmentStatus.PENDING_PAYMENT,
                expiresAt: newExpiresAt,
            },
            select: {
                id: true,
                doctorId: true,
                petOwnerId: true,
                petId: true,
                petIssueReportId: true,
                scheduleId: true,
                fees: true,
                currency: true,
                status: true,
                paymentStatus: true,
                expiresAt: true
            }
        });

        return {
            registerIssue,
            appointment: updatedAppointment
        };
    });

    return result;
};

const getUserPets = async (userId) => {
    if (!userId) {
        return false;
    }

    const pets = await prisma.pet.findMany({
        where: {
            petOwnerId: userId
        },
        select: {
            id: true,
            name: true,
            age: true,
            breed: true,
            category: true,
            petPictures: {
                select: {
                    publicUrl: true
                }
            }
        }
    });

    return pets;
};

const createPetPictures = async (pet) => {
    const pictures = await prisma.petPicture.createMany({
        data: pet
    });

    return pictures;
};

const updatePetOwnerProfile = async (userId, profileData) => {
    if (!userId) {
        return false;
    }

    const { fullName, username, phone, profileImageUrl, bio } = profileData;

    const cleanFullName = fullName?.trim();
    const cleanUsername = username?.trim();
    const cleanPhone = phone?.trim() || "";
    const cleanBio = bio?.trim() || DEFAULT_USER_BIO;

    if (!cleanFullName || !cleanUsername) {
        throw new AppError("Full name and username are required", 400);
    }

    const existingUsername = await prisma.user.findFirst({
        where: {
            username: cleanUsername,
            NOT: {
                id: userId,
            },
        },
    });

    if (existingUsername) {
        throw new AppError("Username is already taken", 400);
    }

    const updatedProfile = await prisma.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
            where: {
                id: userId,
            },
            data: {
                fullName: cleanFullName,
                username: cleanUsername,
                phone: cleanPhone,
                bio: cleanBio,
                ...(profileImageUrl ? { profileImageUrl } : {}),
            },
            select: {
                id: true,
                fullName: true,
                username: true,
                email: true,
                phone: true,
                profileImageUrl: true,
                bio: true,
            },
        });

        await tx.sellerProfile.updateMany({
            where: {
                userId,
            },
            data: {
                businessName: cleanUsername,
                phoneNumber: cleanPhone,
                storeDescription: cleanBio,
                ...(profileImageUrl ? { storeLogo: profileImageUrl } : {}),
            },
        });

        return updatedUser;
    });

    return updatedProfile;
};

const updateAppointmentStripeId = async (appointmentId, sessionId) => {
    if (!appointmentId || !sessionId) {
        throw new AppError("Appointment or Session Id is Invalid", 400);
    }

    return true;
};

const lockUserSlot = async ({ scheduleId, doctorId, petOwnerId }) => {
    if (!scheduleId || !doctorId || !petOwnerId) {
        throw new AppError("Schedule, doctor, or user id is missing", 400);
    }

    const holdMinutes = Number(process.env.APPOINTMENT_HOLD_MINUTES || 15);

    const result = await prisma.$transaction(async (tx) => {
        const schedule = await tx.doctorSchedule.findFirst({
            where: {
                id: scheduleId,
                doctorId
            },
            include: {
                doctor: true
            }
        });

        if (!schedule) {
            throw new AppError("The selected doctor schedule slot could not be found.", 404);
        }

        if (schedule.status !== ScheduleStatus.AVAILABLE) {
            throw new AppError("Schedule is not available", 400);
        }

        const validDoctor = schedule.doctor;

        if (!validDoctor) {
            throw new AppError("Doctor is not valid", 400);
        }

        const startOfDay = new Date(schedule.date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(schedule.date);
        endOfDay.setHours(23, 59, 59, 999);

        const existingActiveAppointment = await tx.appointment.findFirst({
            where: {
                doctorId: schedule.doctorId,
                petOwnerId,
                status: {
                    in: [
                        AppointmentStatus.PENDING_DETAILS,
                        AppointmentStatus.PENDING_REPORT,
                        AppointmentStatus.PENDING_PAYMENT,
                        AppointmentStatus.PAYMENT_PROCESSING,
                        AppointmentStatus.CONFIRMED
                    ]
                },
                checkupTime: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } }
                ]
            }
        });

        if (existingActiveAppointment) {
            throw new AppError("You already have an active or pending appointment with this doctor today.", 400);
        }

        const lockedSchedule = await tx.doctorSchedule.updateMany({
            where: {
                id: scheduleId,
                doctorId,
                status: ScheduleStatus.AVAILABLE
            },
            data: {
                status: ScheduleStatus.HELD,
                lockedByUserId: petOwnerId,
                lockedAt: new Date()
            }
        });

        if (lockedSchedule.count === 0) {
            throw new AppError("This slot was just locked by another user. Please try another slot.", 400);
        }

        const expiresAt = new Date(Date.now() + holdMinutes * 60 * 1000);

        const appointment = await tx.appointment.create({
            data: {
                doctorId: schedule.doctorId,
                petOwnerId,
                scheduleId: schedule.id,
                fees: validDoctor.fees,
                currency: "pkr",
                checkupTime: schedule.startTime,
                expiresAt,
                status: AppointmentStatus.PENDING_DETAILS,
                paymentStatus: PaymentStatus.PENDING
            }
        });

        await tx.doctorSchedule.update({
            where: {
                id: scheduleId
            },
            data: {
                lockedByAppointmentId: appointment.id
            }
        });

        return {
            appointmentId: appointment.id,
            scheduleId: schedule.id,
            doctorId: schedule.doctorId,
            status: appointment.status,
            scheduleStatus: ScheduleStatus.HELD,
            expiresAt: appointment.expiresAt,
            fees: appointment.fees,
            currency: appointment.currency
        };
    });

    return result;
};

const getPetOwnerAppointments = async (petOwnerId) => {
    if (!petOwnerId) {
        throw new AppError("Pet Owner identity is required", 400);
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            petOwnerId: petOwnerId,
        },
        orderBy: {
            checkupTime: "desc",
        },
        include: {
            doctor: {
                include: {
                    user: {
                        select: {
                            fullName: true,
                            profileImageUrl: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            },
            pet: {
                select: {
                    id: true,
                    name: true,
                    category: true,
                    breed: true,
                    age: true,
                },
            },
            doctorSchedule: {
                select: {
                    id: true,
                    date: true,
                    startTime: true,
                    endTime: true,
                    status: true,
                },
            },
            petIssueReport: {
                select: {
                    id: true,
                    issue: true,
                    createdAt: true,
                },
            },
            payment: {
                select: {
                    id: true,
                    status: true,
                    amount: true,
                    currency: true,
                },
            },
        },
    });

    return appointments;
};

const getPetById = async (petId, petOwnerId) => {
    if (!petId || !petOwnerId) {
        throw new AppError("Identity validation parameter missing.", 400);
    }

    const pet = await prisma.pet.findFirst({
        where: {
            id: petId,
            petOwnerId
        },
        include: {
            petPictures: {
                select: {
                    publicUrl: true
                }
            }
        }
    });

    return pet;
};

const updatePet = async (petId, petOwnerId, petData) => {
    if (!petId || !petOwnerId) {
        throw new AppError("Identity validation parameter missing.", 400);
    }

    const existingPet = await prisma.pet.findFirst({
        where: {
            id: petId,
            petOwnerId
        }
    });

    if (!existingPet) {
        throw new AppError("You do not have permission to modify this pet, or it does not exist.", 403);
    }

    const updatedPet = await prisma.pet.update({
        where: {
            id: petId
        },
        data: {
            name: petData.name,
            age: parseFloat(petData.age),
            breed: petData.breed,
            category: petData.category
        }
    });

    return updatedPet;
};

const deletePet = async (petId, petOwnerId) => {
    if (!petId || !petOwnerId) {
        throw new AppError("Identity validation parameter missing.", 400);
    }

    const existingPet = await prisma.pet.findFirst({
        where: {
            id: petId,
            petOwnerId
        }
    });

    if (!existingPet) {
        throw new AppError("You do not have permission to delete this pet, or it does not exist.", 403);
    }

    const deletedPet = await prisma.$transaction(async (tx) => {
        await tx.petPicture.deleteMany({
            where: {
                petId
            }
        });

        await tx.petIssueReport.deleteMany({
            where: {
                petId
            }
        });

        return await tx.pet.delete({
            where: {
                id: petId
            }
        });
    });

    return deletedPet;
};

module.exports = {
    saveUserPet,
    registerPetIssue,
    getUserPets,
    createPetPictures,
    lockUserSlot,
    updatePetOwnerProfile,
    updateAppointmentStripeId,
    getPetOwnerAppointments,
    getPetById,
    updatePet,
    deletePet
};