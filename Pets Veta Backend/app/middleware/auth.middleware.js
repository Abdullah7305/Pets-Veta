const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            console.log("No Token!");
            return res.status(400).json({ err: 'Invalid Token' });

        }
        const secret = process.env.JWT_ACCESS_SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();

    } catch (error) {
        console.log("Error in jwt middleware", error.message);
        return res.status(500).json({ err: error.message });
    }
}

const protectRefresh = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            console.log("No Token!");
            return res.status(400).json({ err: 'Invalid Token' });

        }
        const secret = process.env.JWT_REFRESH_SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();

    } catch (error) {
        console.log("Error in jwt middleware", error.message);
        return res.status(500).json({ err: error.message });
    }
}

const protectOtp = async (req, res, next) => {
    try {
        const otpToken = res.cookies.otpToken;
        if (!otpToken) {
            return res.status(400).json({ err: 'Invalid Cookie' })
        }
        const decoded = jwt.verify(otpToken, JWT.JWT_OTP_SECRET);
        if (!decoded) {
            return res.status(400).json({ err: 'Invalid Decoding in auth middleware' })
        }
        req.user = decoded;
        next();

    } catch (error) {
        console.log("Protect Otp Err", error.message);
        return res.status(500).json({ tokenErr: error.message })
    }
}
module.exports = {
    protect,
    protectRefresh,
    protectOtp
}