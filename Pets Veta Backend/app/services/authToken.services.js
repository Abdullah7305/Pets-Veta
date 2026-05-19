const jwt = require("jsonwebtoken");

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const accessExpiry = process.env.JWT_ACCESS_EXPIRY;
const refreshExpiry = process.env.JWT_REFRESH_EXPIRY;


const createAuthTokens = (payload) => {
    const accessToken = jwt.sign(payload, accessSecret, {
        expiresIn: accessExpiry,
    });

    const refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: refreshExpiry,
    });

    return { accessToken, refreshToken };
};

module.exports = {
    createAuthTokens,
};