const { default: prisma, } = require('../config/prisma');


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

    if (existingAppointment) {
        throw new Error("This appointment slot is already booked");
    }

    const newPetIssue = await prisma.$transaction(async (tx) => {
        const createdPetIssue = await tx.petIssueReport.create({
            data: {
                petOwnerId: petIssue.petOwnerId,
                petId: petIssue.petId,
                issue: petIssue.issue,
            }
        });

        // const appointment = await tx.appointment.create({
        //     data: {
        //         doctorId: petIssue.doctorId,
        //         petIssueReportId: createdPetIssue.id,
        //         fees: doctor.fees,
        //         checkupTime,

        //     },
        // });

        return {
            petIssue: createdPetIssue,
            // appointment,
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


module.exports = {
    saveUserPet,
    registerPetIssue, getUserPets
}
