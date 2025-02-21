module.exports = (err) => {
    if (err.name === 'ValidationError') {
        return Object.values(err.errors).map(e => e.message).join(', ');
    } else {
        return err.message;
    }
}