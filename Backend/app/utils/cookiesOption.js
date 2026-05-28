const cookiesOptions = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

    secure: false,
};

module.exports = cookiesOptions;