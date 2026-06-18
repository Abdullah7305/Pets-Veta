const { default: prisma, } = require('../config/prisma');
const AppError = require('../utils/AppError');
const { ScheduleStatus } = require('@prisma/client')
const stripeService = require('./stripe.service');


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
}

const registerPetIssue = async (petIssue) => {
    if (!petIssue) {
        throw new AppError("Registeration Data Not Found ", 400)
    }
    const validDoctor = await prisma.doctor.findFirst({
        where: {
            id: petIssue.doctorId
        }
    });
    const schedule = await prisma.doctorSchedule.findFirst({
        where: {
            id: petIssue.scheduleId,
            doctorId: petIssue.doctorId
        }
    });

    if (!schedule) {
        throw new AppError("The selected doctor schedule slot could not be found.", 404);
    }
    if (!validDoctor) {
        throw new AppError("Doctor is not Valid ", 400);
    }
    const registerIssue = await prisma.petIssueReport.create({
        data: {
            petOwnerId: petIssue.petOwnerId,
            petId: petIssue.petId,
            issue: petIssue.issue,
        },
    });
    const user = await prisma.user.findFirst({
        where: {
            id: validDoctor.userId
        },
        select: {
            fullName: true
        }
    })
    console.log("Issue is ", registerIssue.id);
    if (!registerIssue) {
        throw new AppError("Issue in Creating Pet Report ", 400);
    }
    const checkoutUrl = await stripeService.createCheckoutSession({
        scheduleId: schedule.id,
        petOwnerId: petIssue.petOwnerId,
        doctorId: schedule.doctorId,
        issueReportId: registerIssue.id,
        fees: validDoctor.fees,
        doctorName: user.fullName
    })
    return { registerIssue, checkoutUrl };
}

const registerPetAppointment = async () => {

}

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
}

const updateAppointmentStripeId = async (appointmentId, sessionId) => {
    if (!appointmentId || !sessionId) {
        throw new AppError("Appointment or Session Id is Invalid", 400);
    }

    const result = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
            stripeSessionId: sessionId,
        },
    });

    return result;
};

const createPetPictures = async (pet) => {
    const pictures = await prisma.petPicture.createMany({
        data: pet
    })
}

const lockUserSlot = async (scheduleId, petOwnerId) => {
    const schedule = await prisma.doctorSchedule.findUnique({
        where: {
            id: scheduleId
        }
    });
    if (!schedule) {
        throw new AppError("Schedule not found ", 404);
    }
    if (schedule.status !== 'AVAILABLE') {
        throw new AppError("Schedule is not Available ", 400)
    }
    const startOfDay = new Date(schedule.date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(schedule.date);
    endOfDay.setHours(23, 59, 59, 999);

    const isAppointmentExist = await prisma.appointment.findFirst({
        where: {
            doctorId: schedule.doctorId,
            petOwnerId: petOwnerId,
            status: {
                in: ['PENDING', 'COMPLETED']
            },
            checkupTime: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    });
    const isSlotExist = await prisma.doctorSchedule.findFirst({
        where: {
            doctorId: schedule.doctorId,
            petOwnerId: petOwnerId,
            status: 'PENDING_PAYMENT',
            date: {
                gte: startOfDay,
                lte: endOfDay
            }
        }
    })
    if (isSlotExist) {
        throw new AppError("You already have a slot pending payment for this doctor today.", 400);
    }
    if (isAppointmentExist) {
        throw new AppError("Appointment  already Exist ", 400);
    }
    try {
        const bookSlot = await prisma.doctorSchedule.update({
            where: {
                id: scheduleId,
                status: ScheduleStatus.AVAILABLE
            },
            data: {
                lockedByUserId: petOwnerId,
                lockedAt: new Date(),
                status: ScheduleStatus.PENDING_PAYMENT
            }
        });

        return bookSlot;
    } catch (error) {

        throw new AppError("This slot was just locked by another user. Please try another slot.", 400);
    }
}
module.exports = {
    saveUserPet,
    registerPetIssue, getUserPets,
    updateAppointmentStripeId,
    createPetPictures,
    lockUserSlot
}
