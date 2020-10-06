const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
        req.userInfo = decoded
        next();
    } catch (error) {
        return res.status(401).json({
            message: "auth failed"
        })
    }
    
    
}