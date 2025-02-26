function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            return next();
        } else {
            return res.status(403).json({ message: 'You are already logged in!' });
        }
    }
}

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            return next();
        } else {
            return res.status(401).json({ message: 'Pls log in to access this resource!' });
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        if (req.item.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can\'t do that' });
        }

        return next();
    }
}

module.exports = {
    isGuest,
    hasUser,
    isOwner
}