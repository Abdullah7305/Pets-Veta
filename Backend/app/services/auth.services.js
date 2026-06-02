const { default: prisma, userRole } = require('../config/prisma');
const { getGoogleProfileToken } = require('../utils/googleAuth');
const { createAuthTokens } = require('../services/authToken.services')
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');


const createDoctor = async (doctorData) => {

    return await prisma.user.create({
        data: {
            fullName: doctorData.fullName,
            email: doctorData.email,
            password: doctorData.hashedPassword,
            username: doctorData.username,
            phone: doctorData.phone,
            doctors: {
                create: {
                    education: doctorData.education,
                    specialization: doctorData.specialization,
                    address: doctorData.address,
                    experience: parseInt(doctorData.experience),
                    fees: parseInt(doctorData.fees)
                }
            },
            doctorCertificates: {
                create: {
                    publicId: doctorData.publicId,
                    publicUrl: doctorData.publicUrl
                }
            },

            userRole: {
                create: { role: "Doctor" }
            }
        },
        include: {
            doctors: true,
            userRole: true,
            doctorCertificates: true
        }
    });
};


const createPetOwner = async (petOwnerData) => {

    const isCreated = await prisma.user.findFirst({
        where: {
            OR: [
                { email: petOwnerData.email },
                { username: petOwnerData.username }
            ]
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
            userRole: true,

        }
    });
    return newPetOwner;
}

const createAccountByGoogleService = async (code) => {
    const profile = await getGoogleProfileToken(code);

    let user = await prisma.user.findUnique({
        where: { email: profile.email },
        include: { userRole: true }
    });
    if (!user) {
        const baseUsername = profile.email.split('@')[0];
        const uniqueUsername = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`

        user = await createPetOwner({
            fullName: profile.name,
            username: uniqueUsername,
            email: profile.email,
            hashedPassword: null

        })
    }
    const userRole = user.userRole?.role || 'Pet Owner';


    const payload = {
        id: user.id,
        email: user.email,
        role: userRole
    };

    const { accessToken, refreshToken } = createAuthTokens(payload);

    return { user, accessToken: accessToken, refreshToken: refreshToken };

}


const createAdmin = async (adminData) => {
    const isCreated = await prisma.user.findUnique({
        where: {
            email: adminData.email
        }
    });

    if (isCreated) {
        return false;
    }

    const newAdmin = await prisma.user.create({
        data: {
            fullName: adminData.fullName,
            username: adminData.username,
            email: adminData.email,
            password: adminData.hashedPassword,
            isEmailVerified: true,
            userRole: {
                create: {
                    role: 'Admin'
                }
            },


        },

        include: {
            userRole: true,
            admin: true
        }
    });

    return newAdmin;
};

const loginUser = async (userData) => {


    const user = await prisma.user.findFirst({
        where: {
            email: userData.email,
            isEmailVerified: true
        },
        include: {
            userRole: true,
            doctors: true,
            admin: true
        }
    });

    if (user?.userRole.role.toLowerCase() === 'doctor') {
        console.log("Hitting condition...");
        if (user.doctors.isVerified === 'PENDING') {
            throw new AppError("Unverified User is not allowed yet...", 403);
            return;
        }
    }

    return user;
};






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


const verifyUsername = async (username) => {
    if (!username) {
        return false;
    }
    const validUser = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    return validUser;
}


const verifyEmail = async (email) => {
    if (!email) {
        return false;
    }
    const validUser = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            userRole: true
        }
    })
    return validUser;
}

const getUserById = async (id) => {
    if (!id) {
        return false;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user;

}


const getUserWithRole = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email
        },
        include: {
            userRole: true,
            doctors: true,
            admin: true
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
    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            otp: "",
            isEmailVerified: true
        }
    })
    return user;
}


const updateUserPassword = async (id, password) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            password: password
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
    updateUserPassword,
    createAdmin,
    getUserById,
    verifyUsername,
    createAccountByGoogleService
};