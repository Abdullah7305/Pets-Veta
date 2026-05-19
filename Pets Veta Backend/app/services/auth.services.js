const { default: prisma, userRole } = require('../config/prisma')


const createDoctor = async (doctorData) => {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: doctorData.email },
                { username: doctorData.username }
            ]
        }
    });

    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    return await prisma.user.create({
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
                create: { role: "Doctor" }
            }
        },
        include: {
            doctors: true,
            userRole: true
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

            userRole: {
                create: {
                    role: 'Admin'
                }
            },

            admin: {
                create: {
                    assignedCode: adminData.hashedAssignedCode
                }
            }
        },

        include: {
            userRole: true,
            admin: true
        }
    });

    return newAdmin;
};

const loginUser = async (userData) => {
    console.log("User data is ", userData);

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
    createAdmin
};