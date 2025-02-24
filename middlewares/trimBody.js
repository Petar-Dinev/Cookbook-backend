module.exports = () => (req, res, next) => {
    if (req.body) {
        for (const key of Object.keys(req.body)) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].trim();
            } else if (Array.isArray(req.body[key])) {
                req.body[key] = req.body[key].map(v => typeof v == 'string' ? v.trim() : v);
            }
        }
    }

    next();
}