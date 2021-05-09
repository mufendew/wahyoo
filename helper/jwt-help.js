const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET

const generateToken = (data) => jwt.sign(data, secretKey);
const verifyToken = (token) => jwt.verify(token, secretKey);

module.exports = {
    generateToken,
    verifyToken
}