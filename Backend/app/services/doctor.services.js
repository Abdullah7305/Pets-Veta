const { default: prisma } = require('../config/prisma')


const addDoctorService = async (skills, userId) => {
    console.log("Skills are ", skills, userId);
    let isExisting = false;

    const doSkillExist = await prisma.doctorSkills.findFirst({
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

    const newSkills = await prisma.doctorSkills.create({
        data: {
            skill: skills.skill,
            price: skills.price,
            userId: userId
        },
    })
    return newSkills;
}

const deleteDoctorService = async (serviceId) => {
    const deletedSkill = await prisma.doctorSkills.delete({
        where: {
            id: serviceId
        }
    })
    return deletedSkill;
}

const getDoctorServices = async (userId) => {
    const services = await prisma.doctorSkills.findMany({
        where: {
            userId: userId
        }
    })
    return services;
}


const updateDoctorServices = async (serviceId, skill, price) => {
    const updatedService = await prisma.doctorSkills.update({
        where: {
            id: serviceId
        },
        data: {
            price: price,
            skill: skill
        }
    })

    return updatedService;
}
module.exports = {
    addDoctorService,
    deleteDoctorService,
    getDoctorServices,
    updateDoctorServices
}