const { default: prisma, } = require('../config/prisma');


const saveUserPet = async (pet) => {
    const newPet = await prisma.pet.create({
        data: {
            petOwnerId: pet.petOwnerId,
            name: pet.name,
            age: pet.age,
            breed: pet.breed
        }
    });
    return newPet;
}

const registerPetIssue = async (petIssue) => {
    if (!petIssue) {
        return false;
    }
    const newPetIssue = await prisma.petIssueReport.create({
        data: {
            petOwnerId: petIssue.petOwnerId,
            petId: petIssue.petId,
            issue: petIssue.issue,
            appointmentType: petIssue.appointmentType
        }
    })
    return newPetIssue;
}

const getUserPets = async (userId) => {
    if (!userId) {
        return false;
    }
    const pets = await prisma.pet.findUnique({
        where: {
            petOwnerId: userId
        },
        select: {
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