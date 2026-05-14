const authServices = require('../services/auth.services')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// TODO: Create the jwt authentication
// TODO: Create the cookies token management system 

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
        const secret_key = process.env.JWT_SECRET;
        const expiry = process.env.JWT_EXPIRY;
        const payload = {
            id: newDoctor.id,
            username: newDoctor.username,
            email: newDoctor.email
        };

        const token = jwt.sign(
            payload,
            secret_key,
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
            'token',
            token,
            cookiesOption
        )
        return res.status(201).json({ message: 'Success', user: newDoctor, token: token })

    } catch (error) {
        console.log("Error in create doctor account controller ", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}


const createPetOwnerAccount = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(req.body, 12);

        const petOwnerData = {
            ...req.body,
            hashedPassword
        }

        const newPetOwner = await authServices.createPetOwner(petOwnerData);

        if (newPetOwner === false) {
            return res.status(400).json({ message: 'User already Exist' })
        }

        const payload = {
            id: newPetOwner.id,
            username: newPetOwner.username,
            email: newPetOwner.email
        }

        const expiry = process.env.JWT_EXPIRY;

        const secret_key = process.env.JWT_SECRET;

        const token = jwt.sign(
            payload,
            secret_key,
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
            'token',
            token,
            cookiesOption
        );

        return res.status(201).json({ message: 'Success', user: newPetOwner, token: token })

    } catch (error) {
        console.log("Error in create doctor account controller ", error.message);
        return res.status(500).json({ serverErr: error.message })
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

        const validUser = {
            name: user.name,
            email: user.email,
            username: user.username
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const expiry = process.env.JWT_EXPIRY;
        const secret_key = process.env.JWT_SECRET;
        const token = jwt.sign(
            payload,
            secret_key,
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
            'token',
            token,
            cookiesOption
        )

        return res.status(200).json({ message: 'Success', user: validUser });

    } catch (error) {
        console.log("Error in loggin in user", error.message);
        return res.status(500).json({ serverErr: error.message })
    }
}

module.exports = {
    createDoctorAccount, createPetOwnerAccount, loginUserAccount
}