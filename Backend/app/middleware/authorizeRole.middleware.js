const authenticateUserRole = (...rolname) => {
    return (req, res, next) => {
        console.log("Req.user is", req.user);
        if (!req.user) {
            return res.status(401).json({ message: 'User is not loggedIn' });
        }
        if (!rolname.includes(req.user.role)) {
            return res.status(401).json({ message: 'Invalid Access' })
        }

        next()
    }
}


module.exports = { authenticateUserRole };