const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.headers['p-authorization'];

    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            req.token = token;
        } catch (err) {
            console.log(err);
            
            return res.status(403).json({ message: 'Invalid authorization token!' })
        }
    }

    next()
}