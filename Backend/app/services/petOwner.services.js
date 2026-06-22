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

    const newPetIssue = await prisma.$transaction(async (tx) => {
        const createdPetIssue = await tx.petIssueReport.create({
            data: {
                petOwnerId: petIssue.petOwnerId,
                petId: petIssue.petId,
                issue: petIssue.issue,
            }
        });

        const appointment = await tx.appointment.create({
            data: {
                doctorId: petIssue.doctorId,
                petIssueReportId: createdPetIssue.id,
                fees: doctor.fees,
                checkupTime,


            },
        });

        return {
            petIssue: createdPetIssue,
            appointment,
        };
    });

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

const updatePetOwnerProfile = async (userId, profileData) => {
    if (!userId) {
        return false;
    }

    const { fullName, username, phone, profileImageUrl } = profileData;

    const existingUsername = await prisma.user.findFirst({
        where: {
            username,
            NOT: {
                id: userId,
            },
        },
    });

    if (existingUsername) {
        throw new AppError("Username is already taken", 400);
    }

    const updatedProfile = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            fullName,
            username,
            phone,
            ...(profileImageUrl ? { profileImageUrl } : {}),
        },
        select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
            profileImageUrl: true,
        },
    });

    return updatedProfile;
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
module.exports = {
    saveUserPet,
    registerPetIssue, getUserPets,
    updatePetOwnerProfile,
    updateAppointmentStripeId
}
