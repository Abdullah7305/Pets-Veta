const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY;

const refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

const otpSecret = process.env.JWT_OTP_SECRET;
const otpExpiry = process.env.JWT_OTP_EXPIRY;

const Token_Types = {
    ACCESS: "access",
    REFRESH: "refresh",
    OTP: "otp"
}



const jwtSign = (payload, type) => {
    if (type === Token_Types.ACCESS) {
        secret = accessTokenSecret;
        expiresIn = accessTokenExpiry;
    }
    else if (type === Token_Types.REFRESH) {
        secret = refreshTokenSecret;
        expiresIn = refreshTokenExpiry;
    }
    else if (type === Token_Types.OTP) {
        secret = otpSecret;
        expiresIn = otpExpiry;
    }

    const token = jwt.sign(
        payload,
        secret,
        {
            expiresIn
        }
    )

    return token;
}


module.exports = {
    jwtSign,
    Token_Types
}