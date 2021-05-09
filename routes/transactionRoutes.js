const router = require('express').Router();
// const product = require('./RProduct');
const {auth, authorization} = require('../middleware/auth')
const TransactionController = require('../controllers/transactionController')

router.use(auth)
router.get('/:accountid', TransactionController.getTransaction)
router.post('/deposit', authorization, TransactionController.deposit)
router.post('/withdraw', authorization, TransactionController.withdraw)


module.exports = router