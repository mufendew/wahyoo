const {User,Account} = require('../models')
const {hash,compare} = require('../helper/hash')
const { generateToken } = require('../helper/jwt-help.js');

class authController{
    static login(req, res, next){
        User.findOne({
            where: {
                email: req.body.email,
            },
            include: Account
        })
        .then(({id,name,email,password,Accounts}) => {
            if (id && compare(req.body.password, password)) {
                const token = generateToken({id, name, email})
                res.status(200).json({id,name,email,token,Accounts})
            }else{
                throw {msg : "email or password wrong"}
            }
        })
        .catch(err =>{
            next({type : "wrong credential"})
        })
    }

    static register(req, res,next){
        let result = {}
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash(req.body.password)
        })
        .then(data => {
            result = data.dataValues
            return Account.create({
                UserId: data.id,
                type: "Taplus Muda",
                balance: 500000
            })
        })
        .then(data=>{
            result.account = data.dataValues
            delete result.password
            res.status(201).json(result)
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else if(err.name === "SequelizeUniqueConstraintError"){
                next({type : "SequelizeUniqueConstraintError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }
    

}

module.exports = authController

