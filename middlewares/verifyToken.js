const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(401).send({ message: 'No token provided' })
        let decoded = jwt.verify(token, process.env.SECRET || '123')
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).send({ message: 'Invalid token' })
    }
}

module.exports = verifyToken
