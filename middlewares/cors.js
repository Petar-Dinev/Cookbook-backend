const allowedOrigins = [
    'http://localhost:5173', //vite
    'http://localhost:3000', //CRA
    // process.env.FRONTEND_URL // Vercel
];

module.exports = () => (req, res, next) => {

    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEADERS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');

    if (req.method == 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
}