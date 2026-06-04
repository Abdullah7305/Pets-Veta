const { default: prisma } = require('../config/prisma')


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
    })
    return newSkills;
}

const deleteDoctorService = async (serviceId) => {
    const deletedSkill = await prisma.doctorSkill.delete({
        where: {
            id: serviceId
        }
    })
    return deletedSkill;
}

const getDoctorServices = async (userId) => {

    const services = await prisma.doctorSkill?.findMany({
        where: {
            userId: userId
        }
    })
    if (!services) {
        return false;
    }
    return services;
}


const updateDoctorServices = async (serviceId, skill, price) => {
    const updatedService = await prisma.doctorSkill.update({
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

const getDoctorAppointments = async (userId) => {
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

    return prisma.appointment.findMany({
        where: {
            doctorId: doctor.id,
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
}

module.exports = {
    addDoctorService,
    deleteDoctorService,
    getDoctorServices,
    updateDoctorServices,
    getDoctorAppointments
}
