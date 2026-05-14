const { default: prisma, userRole } = require('../config/prisma')




const createDoctor = async (doctorData) => {
    console.log("Data is ", doctorData)
    const isCreated = await prisma.user.findUnique({
        where: {
            email: doctorData.email
        }
    })
    if (isCreated) {
        return false;
    }
    const newDoctor = await prisma.user.create({
        data: {
            fullName: doctorData.fullName,
            email: doctorData.email,
            password: doctorData.hashedPassword,
            username: doctorData.username,

            doctors: {
                create: {
                    bio: doctorData.bio,
                    education: doctorData.education,
                    specialization: doctorData.specialization,
                    address: doctorData.address,
                    degreeLicenseUrl: doctorData.degreeLicenseUrl,
                    experience: parseInt(doctorData.experience)
                }
            },

            userRole: {
                create: {
                    role: 'Doctor'
                }
            }
        },
        include: {
            doctors: true,
            userRole: true
        }

    });

    return newDoctor;
}

const createPetOwner = async (petOwnerData) => {

    const isCreated = await prisma.user.findUnique({
        where: {
            email: petOwnerData.email
        }
    })
    if (isCreated) {
        return false;
    }
    const newPetOwner = await prisma.user.create({
        data: {
            fullName: petOwnerData.fullName,
            email: petOwnerData.email,
            password: petOwnerData.hashedPassword,
            username: petOwnerData.username,

            userRole: {
                create: {
                    role: 'PetOwner'
                }
            }
        },
        include: {
            userRole: true
        }
    });
    return newPetOwner;
}

const loginUser = async (userData) => {
    const user = prisma.user.findUnique({
        where: {
            email: userData.email
        },
        include: {
            userRole: true,
            doctors: true,
            admin: true
        }
    })
    return user;
}



module.exports = { createDoctor, createPetOwner, loginUser };