const { default: prisma, userRole } = require('../config/prisma')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD, // app password
    },
});



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
            username: petOwnerData.username,
            email: petOwnerData.email,
            password: petOwnerData.hashedPassword,


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

const createAdmin = async (adminData) => {
    const isCreated = await prisma.user.findUnique({
        where: {
            email: adminData.email,
            username: adminData.username
        }
    })
    if (isCreated) {
        return false;
    }
    const newAdmin = await prisma.user.create({
        data: {
            fullName: adminData.fullName,
            username: adminData.username,
            email: adminData.email,
            password: adminData.hashedPassword,

            userRole: {
                create: {
                    role: 'PetOwner'
                }
            }
        },
        include: {
            userRole: true
        }
    })
    return newAdmin;
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

const refreshUserToken = async (email, refreshToken) => {
    console.log("email and token is ", email, refreshToken);
    const updatedUser = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            refreshToken: refreshToken
        }
    })

    return refreshToken;
}


const verifyEmail = async (email) => {
    if (!email) {
        return false;
    }
    const validUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return validUser;
}
const getUserWithRole = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            admin: true,
            doctors: true
        }
    });
};

const saveUserOtp = async (email, userOtp) => {
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            otp: userOtp
        }
    })
    return user;

}

const updateOtpField = async (email) => {
    const user = await prisma.user.delete({
        where: {
            email: email
        },
        data: {
            otp: ""
        }
    })
    return user;
}

const updateUserPassword = async (password) => {
    const user = await prisma.user.update({
        where: {
            email: email,
            data: {
                password: password
            }
        }
    })
    return user;
}


module.exports = {
    createDoctor,
    createPetOwner,
    loginUser,
    refreshUserToken,
    verifyEmail,
    saveUserOtp,
    updateOtpField,
    getUserWithRole,
    createAdmin
};