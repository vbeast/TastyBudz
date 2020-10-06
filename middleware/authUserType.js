const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    try{
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY)
        if(decoded.userType === "0"){
            req.userInfo = decoded
        }
        else{
            req.userInfo = null
        }
        next()
    }
    catch{
        res.status(401).json({
            message: "auth failed"
        })
    }
}