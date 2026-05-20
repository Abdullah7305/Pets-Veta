const jwt = require("jsonwebtoken");

const createAuthTokens = (payload) => {

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    const accessExpiry = process.env.JWT_ACCESS_EXPIRY;
    const refreshExpiry = process.env.JWT_REFRESH_EXPIRY;


    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT Configuration Error: Missing ACCESS or REFRESH secret keys in environment variables.");
    }

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