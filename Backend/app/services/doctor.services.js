const { default: prisma } = require('../config/prisma')


const addDoctorService = async (skills, userId) => {
    console.log("Skills are ", skills, userId);
    const newSkills = await prisma.doctorSkills.create({
        data: {
            skill: skills.skill,
            price: skills.price,
            userId: userId
        },
    })
    return newSkills;
}

module.exports = {
    addDoctorService
}