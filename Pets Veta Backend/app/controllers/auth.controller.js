const authServices = require('../services/auth.services')
const authUtils = require('../utils/auth.utils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createDoctorAccount = async (req, res) => {
    try {
        const { fullName, username, email, password, bio, education, specialization, address, experience } = req.body;

        const degreeLicenseUrl = "There will be the liscence photo url ";

        const hashedPassword = await bcrypt.hash(password, 12);

        req.body.password = hashedPassword;

        const doctorData = {
            ...req.body,
            degreeLicenseUrl,
            hashedPassword
        }


        const newDoctor = await authServices.createDoctor(doctorData);

        if (newDoctor === false) {
            return res.status(400).json({ message: 'User already Exist' })
        }
        const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;
        const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY
        const expiry = process.env.JWT_ACCESS_EXPIRY;
        const payload = {
            id: newDoctor.id,
            username: newDoctor.username,
            email: newDoctor.email
        };

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
        const updatedUser = await authServices.refreshUserToken(email, refreshToken);
        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',

        }
        res.cookie(
            'accessToken',
            accessToken,
            cookiesOption
        );
        res.cookie(
            'refreshToken',
            refreshToken,
            cookiesOption
        )
        return res.status(201).json({ message: 'Success', user: newDoctor, token: accessToken })

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
        console.log("new pet owner is ");


        const newPetOwner = await authServices.createPetOwner(petOwnerData);
        console.log("new pet owner is ");

        if (newPetOwner === false) {
            return res.status(400).json({ message: 'User already Exist' })
        }

        const payload = {
            id: newPetOwner.id,
            username: newPetOwner.username,
            email: newPetOwner.email
        }

        const expiry = process.env.JWT_ACCESS_EXPIRY;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY
        const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;
        const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;

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
                expiresIn: refreshTokenExpiry,
            }

        )
        console.log("refreshToken is ", refreshToken);
        const updatedUser = await authServices.refreshUserToken(newPetOwner.email, refreshToken);

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',

        }

        res.cookie(
            'accessToken',
            accessToken,
            cookiesOption
        );
        res.cookie(
            'refreshToken',
            refreshToken,
            cookiesOption
        )

        return res.status(201).json({ message: 'Success', user: newPetOwner, token: accessToken })

    } catch (error) {
        console.log("Error in create PetOwner account controller ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}

const createAdminAccount = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
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

        const expiry = process.env.JWT_ACCESS_EXPIRY;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY
        const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;
        const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;

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
                expiresIn: refreshTokenExpiry,
            }

        )

        const updatedUser = await authServices.refreshUserToken(newPetOwner.email, refreshToken);

        const cookiesOption = {
            httpOnly: true,
            sameSite: 'strict',

        }

        res.cookie(
            'accessToken',
            accessToken,
            cookiesOption
        );
        res.cookie(
            'refreshToken',
            refreshToken,
            cookiesOption
        )

        return res.status(201).json({ message: 'Success', adminData: adminData })

    } catch (error) {
        console.log("Error in admin in user", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}


const loginUserAccount = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log("Data", req.body);

        const user = await authServices.loginUser(req.body);

        if (!user) {
            return res.status(400).json({ err: 'Email or Password invalid' });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(401).json({ error: 'Password or Email do not match' })
        }

        const validUser = {
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role

        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }

        const expiry = process.env.JWT_ACCESS_EXPIRY;
        const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY;
        const refreshTokenSecretKey = process.env.JWT_REFRESH_SECRET;
        const accessTokenSecretKey = process.env.JWT_ACCESS_SECRET;

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
        const updatedUser = await authServices.refreshUserToken(email, refreshToken);

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
            username: validUser.username,
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
        const { email, username } = req.user;
        const { otpCode } = req.body;
        const validUser = await authServices.verifyEmail(email);
        if (!validUser) {
            return res.status(400).json({ err: 'Invalid User Email' });
        }

        const isMatched = await bcrypt.compare(otpCode, validUser.otp);
        if (!isMatched) {
            return res.status(400).json({ err: 'Otp code is invalid' });
        }
        const updatedUserSchema = await authServices.updateOtpField(email);
        return res.status(200).json({ message: 'Success', user: updatedUserSchema });


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
            username: validUser.username,
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
        const { id, email, username } = req.user;
        const { password } = req.body;
        const isValidUser = await authServices.verifyEmail(email);
        if (!isValidUser) {
            return res.status(400).json({ err: 'Invalid User' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await authServices.resetUserPassword(hashedPassword);



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