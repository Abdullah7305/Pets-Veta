const { default: prisma, } = require('../config/prisma');
const AppError = require('../utils/AppError');


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
        return false;
    }

    const checkupTime = new Date(petIssue.checkupTime);

    if (Number.isNaN(checkupTime.getTime())) {
        throw new Error("Invalid appointment time");
    }

    const doctor = await prisma.doctor.findUnique({
        where: {
            id: petIssue.doctorId,
        },
        select: {
            id: true,
            fees: true,
        },
    });

    if (!doctor) {
        throw new Error("Doctor not found");
    }

    const existingAppointment = await prisma.appointment.findFirst({
        where: {
            doctorId: petIssue.doctorId,
            checkupTime,
        },
    });
    console.log("Appointment is ", existingAppointment);
    if (existingAppointment) {
        console.log("Check Existin Appointemtn Condition Running")
        throw new Error("This appointment slot is already booked");
        return;
    }
    console.log("Outside Appointment COndition here");
    let createdPetIssue = ''
    const newPetIssue = await prisma.$transaction(async (tx) => {
        createdPetIssue = await tx.petIssueReport.create({
            data: {
                petOwnerId: petIssue.petOwnerId,
                petId: petIssue.petId,
                issue: petIssue.issue,
            }
        });

        const appointment = await tx.appointment.create({
            data: {
                doctorId: petIssue.doctorId,
                fees: doctor.fees,
                checkupTime,
                petIssueReportId: createdPetIssue.id


            },
        });
        return {
            petIssue: createdPetIssue,
            appointment,
        };
    });
    console.log("Issue is ====>", createdPetIssue)

    return newPetIssue;
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
            category: true
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
module.exports = {
    saveUserPet,
    registerPetIssue, getUserPets,
    updateAppointmentStripeId,
    createPetPictures
}
