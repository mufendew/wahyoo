const {User,Account,Transaction} = require('../models')

class TransactionController{
    static getTransaction(req,res,next){
        Account.findOne({
            where: {
                id: req.params.accountid,
                UserId: req.user.id
            },
            include: [
                {
                    model: Transaction,
                    separate : true,
                    limit: req.query.limit || 10,
                    offset: req.query.offset || 0,
                }
            ]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err);
            next(err)
        })
    }

    static deposit(req, res,next){
        let result = {}
        Transaction.create({
            AccountId: req.body.accountid,
            UserId: req.user.id,
            amount: req.body.amount,
            type: "debet"
        })
        .then(data => {
            result.msg = "deposit succsess"
            result = {...result, ...data.dataValues}
            return Account.findOne({
                where : {
                    id: +req.body.accountid,
                    UserId: req.user.id,
                }
            })
        })
        .then(data=>{
            result.balance = data.balance
            res.status(201).json(result)
        })
        .catch(err =>{
            console.log(err);
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else{
                next(err)
            }
            
        })
    }

    static withdraw(req, res,next){
        let result = {}
        Transaction.create({
            AccountId: req.body.accountid,
            UserId: req.user.id,
            amount: req.body.amount,
            type: "credit"
        })
        .then(data => {
            result.msg = "withdraw succsess"
            result = {...result, ...data.dataValues}
            return Account.findOne({
                where : {
                    id: +req.body.accountid,
                    UserId: req.user.id,
                }
            })
        })
        .then(data=>{
            result.balance = data.balance
            res.status(201).json(result)
        })
        .catch(err =>{
            if (err.name === "SequelizeValidationError") {
                next({type : "SequelizeValidationError",msg : err.errors})
            }else if (err.name === "SequelizeDatabaseError" && err.parent.code === "ER_SIGNAL_EXCEPTION") {
                next({type : "Amount Limit Excedeed"})
            }else{
                next(err)
            }
            
        })
    }
    

}

module.exports = TransactionController

