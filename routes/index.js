const router = require('express').Router();
const Transaction = require('./transactionRoutes');
const Auth = require('../controllers/authController')

router.post('/login', Auth.login)
router.post('/register', Auth.register)

router.use("/transaction", Transaction)

module.exports = router
