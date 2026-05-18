const authServices = require('../services/auth.services')
const authUtils = require('../utils/auth.utils');
const uploadToCloudinary = require('../utils/cloudinary.utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createDoctorAccount = async (req, res) => {
    try {
        const { fullName, username, email, password, bio, education, specialization, address, experience } = req.body;
        console.log("Request hit ");
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const result = await uploadToCloudinary(
            req.file.buffer,
            "pets-veta/doctor-document"
        );

        const degreeLicenseUrl = result.secure_url;

        const hashedPassword = await bcrypt.hash(password, 12);

        const doctorData = {
            ...req.body,
            degreeLicenseUrl,
            hashedPassword
        }


        const newDoctor = await authServices.createDoctor(doctorData);

        if (newDoctor === false) {
            return res.status(400).json({ message: 'User already Exist' })
        }

        const otpCode = authUtils.otpGenerator();
        const hashedOtp = await bcrypt.hash(otpCode, 12);
        const saveUserOtp = await authServices.saveUserOtp(email, hashedOtp);
        authUtils.sendOtp(email, otpCode)
            .then((mesg) => {
                console.log("otp mesg", mesg)
            })
            .catch((err) => {
                console.log("Otp error", err)
            })

        const payload = {
            id: newDoctor.id,
            email: newDoctor.email
        }

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000
        }
        const otpToken = jwt.sign(
            payload,
            process.env.JWT_OTP_SECRET,
            {
                expiresIn: '6min'
            }

        )
        res.cookie(
            'otpToken',
            otpToken,
            cookiesOption
        )


        return res.status(201).json({ message: 'OTP Sent' })

    } catch (error) {
        console.log("Error in create doctor account controller ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}


const createPetOwnerAccount = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const petOwnerData = {
            ...req.body,
            hashedPassword
        }



        let newPetOwner = await authServices.createPetOwner(petOwnerData);

        console.log("Data is ", newPetOwner)
        newPetOwner = {
            name: newPetOwner.name,
            username: newPetOwner.username,
            email: newPetOwner.email,
            role: newPetOwner.userRole.role
        }

        if (newPetOwner === false) {
            return res.status(400).json({ message: 'User already Exist' })
        }
        const otpCode = authUtils.otpGenerator();
        const hashedOtp = await bcrypt.hash(otpCode, 12);
        const saveUserOtp = await authServices.saveUserOtp(email, hashedOtp);
        authUtils.sendOtp(email, otpCode)
            .then((mesg) => {
                console.log("Otp Mesg", mesg)
            })
            .catch((err) => {
                console.log("Error is sending the OTP");
            })

        const payload = {
            id: newPetOwner.id,
            email: newPetOwner.email
        }

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000

        }
        const otpToken = jwt.sign(
            payload,
            process.env.JWT_OTP_SECRET,
            {
                expiresIn: '10min'
            }

        )
        res.cookie(
            'otpToken',
            otpToken,
            cookiesOption
        )



        return res.status(201).json({ message: 'OTP Sent', user: newPetOwner })

    } catch (error) {
        console.log("Error in create PetOwner account controller ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}

const createAdminAccount = async (adminDetails) => {
    try {
        const { fullName, username, email, password } = adminDetails;
        const hashedPassword = await bcrypt.hash(password, 12);
        const adminData = {
            ...req.body,
            hashedPassword: hashedPassword
        }
        const newAdmin = await authServices.createAdmin(adminData);
        const payload = {
            id: newAdmin.id,
            username: newAdmin.username,
            email: newAdmin.email,
            role: newAdmin.role
        }

        // const expiry = process.env.JWT_ACCESS_EXPIRY;
        // const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY
        // const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;
        // const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;

        // const accessToken = jwt.sign(
        //     payload,
        //     accessTokenSecretKey,
        //     {
        //         expiresIn: expiry
        //     }
        // );

        // const refreshToken = jwt.sign(
        //     payload,
        //     refreshTokenSecretKey,

        //     {
        //         expiresIn: refreshTokenExpiry,
        //     }

        // )

        // const updatedUser = await authServices.refreshUserToken(newAdmin.email, refreshToken);

        // const cookiesOption = {
        //     httpOnly: true,
        //     sameSite: 'strict',

        // }
        // const safeAdmin = {
        //     fullName: newAdmin.fullName,
        //     username: newAdmin.username,
        //     email: newAdmin.email
        // }


        // res.cookie(
        //     'accessToken',
        //     accessToken,
        //     cookiesOption
        // );
        // res.cookie(
        //     'refreshToken',
        //     refreshToken,
        //     cookiesOption
        // )

        // return res.status(201).json({ message: 'Success', admin: safeAdmin })

    } catch (error) {
        console.log("Error in admin in user", error.message);
        // return res.status(500).json({ serverErr: error.message })
    }
}


const loginUserAccount = async (req, res) => {
    try {

        const { email, password } = req.body;


        const user = await authServices.loginUser(req.body);

        if (!user) {
            return res.status(400).json({ err: 'Email or Password invalid' });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(401).json({ error: 'Password or Email do not match' })
        }
        console.log("Login user is ", user);

        const validUser = {
            name: user.fullName,
            email: user.email,
            username: user.username,
            role: user.userRole.role

        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.userRole.role
        }

        const expiry = process.env.JWT_ACCESS_EXPIRY;
        const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY;
        const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;

        const accessToken = jwt.sign(
            payload,
            accessTokenSecretKey,
            {
                expiresIn: expiry
            }
        );

        const refreshToken = jwt.sign(
            payload,
            refreshTokenSecretKey,
            {

                expiresIn: refreshTokenExpiry
            }
        )
        const updatedUserToken = await authServices.refreshUserToken(email, refreshToken);

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',

        }
        res.cookie(
            'accessToken',
            accessToken,
            cookiesOption
        )
        res.cookie(
            'refreshToken',
            refreshToken,
            cookiesOption
        )

        return res.status(200).json({ message: 'Success', user: validUser, token: accessToken });

    } catch (error) {
        console.log("Error in loggin in user", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}

const refreshTokenController = async (req, res) => {
    try {
        const { id, email, username } = req.user;
        const payload = {
            id: id,
            email: email,
            username: username
        }
        const expiry = process.env.JWT_ACCESS_EXPIRY;
        const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY;
        const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;

        const accessToken = jwt.sign(
            payload,
            accessTokenSecretKey,
            {
                expiresIn: expiry
            }
        );
        const refreshToken = jwt.sign(
            payload,
            refreshTokenSecretKey,
            {

                expiresIn: refreshTokenExpiry
            }
        )
        const updatedUserToken = await authServices.refreshUserToken(email, refreshToken);

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000
        }
        res.cookie(
            'accessToken',
            accessToken,
            cookiesOption
        )
        res.cookie(
            'refreshToken',
            refreshToken,
            cookiesOption
        )

        return res.status(200).json({ message: 'Success' });

    } catch (error) {
        console.log("Error in refresh token controller ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}

const verifyUserEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const validUser = await authServices.verifyEmail(email);
        if (!validUser) {
            return res.status(400).json({ err: 'Invalid User' });
        }
        const otpCode = authUtils.otpGenerator();
        const hashedOtp = await bcrypt.hash(otpCode, 12);
        const storedOtp = await authServices.saveUserOtp(email, hashedOtp);
        await authUtils.sendOtp(email, otpCode)

        const payload = {
            id: validUser.id,
            email: validUser.email,

        }
        const otpToken = jwt.sign(
            payload,
            process.env.JWT_OTP_SECRET,
            {
                expiresIn: '3min'
            }
        )
        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 60 * 1000
        }
        res.cookie(
            'otpToken',
            otpToken,
            cookiesOption
        )
        return res.status(201).json({ message: 'OTP sent' });

    } catch (error) {
        console.log("Error in verifying user mail", error.message);
        return res.status(500).json({ serverErr: error.message });
    }
}

const verifyOtp = async (req, res) => {
    try {
        console.log("Request cookies is ", req.user);
        const { id, email } = req.user;
        console.log("Incming OTP is", req.body);
        const { otp } = req.body;
        const validUser = await authServices.verifyEmail(email);
        if (!validUser) {
            return res.status(400).json({ err: 'Invalid User Email' });
        }


        const isMatched = await bcrypt.compare(otp, validUser.otp);
        if (!isMatched) {
            return res.status(400).json({ err: 'Otp code is invalid' });
        }
        const updatedUserSchema = await authServices.updateOtpField(email);
        const userData = await authServices.getUserWithRole(email)

        const accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY;
        const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY;
        const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

        const refreshTokenPayload = {
            id: validUser.id,
        }

        const accessTokenPayload = {
            id: validUser.id,
            email: validUser.email,

        }

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',
        }

        const refreshToken = jwt.sign(
            refreshTokenPayload,
            refreshTokenSecret,
            {
                expiresIn: refreshTokenExpiry
            }
        )
        const accessToken = jwt.sign(
            accessTokenPayload,
            accessTokenSecret,
            {
                expiresIn: accessTokenExpiry
            }
        )

        res.cookie(
            'accessToken',
            accessToken,
            cookiesOption
        )
        res.cookie(
            'refreshToken',
            refreshToken,
            cookiesOption
        )

        return res.status(200).json({
            message: 'Success', user: {
                id: updatedUserSchema.id,
                username: updatedUserSchema.username,
                email: updatedUserSchema.email,
                role: userData.userRole.role

            }
        });


    } catch (error) {
        console.log("Error in verifying  OTP ", error.message);
        return res.status(500).json({ serverErr: error.message });
    }
}

const resendUserOtp = async (req, res) => {
    try {
        const { email } = req.user;
        const validUser = await authServices.verifyEmail(email);
        if (!validUser) {
            return res.status(400).json({ err: 'Invalid User Email' });
        }
        const otpCode = authUtils.otpGenerator();
        const hashedOtp = await bcrypt.hash(otpCode, 12);
        const storedOtp = await authServices.saveUserOtp(email, hashedOtp);
        await authUtils.sendOtp(email, otpCode)

        const payload = {
            id: validUser.id,
            email: validUser.email,

        }
        const otpToken = jwt.sign(
            payload,
            process.env.JWT_OTP_SECRET,
            {
                expiresIn: '6min'
            }
        )
        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 60 * 1000

        }
        res.cookie(
            'otpToken',
            otpToken,
            cookiesOption
        )
        return res.status(201).json({ message: 'OTP sent' });


    } catch (error) {
        console.log("Error in resending Otp", error.message);
        return res.status(500).json({ serverErr: error.message });
    }
}

const resetUserPassword = async (req, res) => {
    try {
        const { id, email } = req.user;
        const { password } = req.body;
        const isValidUser = await authServices.verifyEmail(email);
        if (!isValidUser) {
            return res.status(400).json({ err: 'Invalid User' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await authServices.updateUserPassword(id, hashedPassword);

        return res.status(201).json({ message: 'Password Reset Successfully' });

    } catch (error) {
        console.log("Error in password resets ", error.message);
        return res.status(500).json({ serverErr: error.message });
    }
}



module.exports = {
    createDoctorAccount,
    createPetOwnerAccount,
    loginUserAccount,
    refreshTokenController,
    verifyUserEmail,
    resetUserPassword,
    verifyOtp,
    resendUserOtp
}