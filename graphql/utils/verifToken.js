const jwt = require('jsonwebtoken')

const verify = (token) =>{
    try {
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = verify