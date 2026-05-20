const jwt = require('jsonwebtoken');

const Token_Types = {
    ACCESS: "access",
    REFRESH: "refresh",
    OTP: "otp"
};

const jwtSign = (payload, type) => {
    let secret;
    let expiresIn;

    // Moving the process.env reads INSIDE the execution flow 
    // guarantees that dotenv has already loaded your variables.
    if (type === Token_Types.ACCESS) {
        secret = process.env.JWT_ACCESS_SECRET;
        expiresIn = process.env.JWT_ACCESS_EXPIRY;
    }
    else if (type === Token_Types.REFRESH) {
        secret = process.env.JWT_REFRESH_SECRET;
        expiresIn = process.env.JWT_REFRESH_EXPIRY;
    }
    else if (type === Token_Types.OTP) {
        secret = process.env.JWT_OTP_SECRET;
        expiresIn = process.env.JWT_OTP_EXPIRY;
    }

    // Safety fallback check to prevent silent failures
    if (!secret) {
        throw new Error(`JWT Configuration Error: Secret for token type "${type}" is missing or undefined.`);
    }

    const token = jwt.sign(
        payload,
        secret,
        {
            expiresIn
        }
    );

    return token;
};

module.exports = {
    jwtSign,
    Token_Types
};