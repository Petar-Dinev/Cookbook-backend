module.exports = () => (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, HEADERS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type')

    next()
}