const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("No Token!");
            return res.status(400).json({ err: 'Invalid Token' });

        }
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();

    } catch (error) {
        console.log("Error in jwt middleware", error.message);
        return res.status(500).json({ err: error.message });
    }
}