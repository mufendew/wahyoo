const jwt = require('jsonwebtoken')
const {User, Account} = require('../models')

const auth = (req,res,next) => {
    try {
        let {id,email,name} = jwt.verify(req.headers.token,process.env.JWT_SECRET)
        req.user = {id,email,name}
        console.log(id);
        next()
    } catch (error) {
        next({type : "unauthorized"})
    }    
}
const authGraph = (req,res,next) => {
    try {
        let {id,email,name} = jwt.verify(req.headers.token,process.env.JWT_SECRET)
        req.user = {id,email,name}
        console.log(id);
    } catch (error) {
        req.user = null
    }
    next()   
}

const authorization = (req, res, next) => {

    Account.findByPk(req.body.accountid)
    .then((data) =>{
        if (data && data.UserId === req.user.id) {
            next()
        }else {
            next({type : "unauthorized"})
        }
    })
    .catch((err) =>{
        next(err)
    })
}

module.exports = {auth , authorization, authGraph}