function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            return res.status(403).json({ message: 'You are already logged in!' })
        }
    }
}

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            return res.status(401).json({ message: 'Pls log in to access this resource!' })
        }
    }
}

// function isOwner() {
//     return (req, res, next) => {

//     }
// }

module.exports = {
    isGuest,
    hasUser,
}