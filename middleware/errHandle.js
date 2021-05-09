const errHandler = (err, req, res, next) => {
    switch (err.type) {
        case "SequelizeValidationError":
            res.status(400).json({status:"failed",code: 400, msg: err.msg.map(er => er.message)})
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({status:"failed",code: 400, msg: err.msg.map(er => er.message)})
            break;
        case "unauthorized" :
            res.status(401).json({status:"failed",code: 401,msg:"unauthorized"})
            break;
        case "Data Not Found" :
            res.status(404).json({status:"failed",code: 404,msg:"Data Not Found"})
            break;
        case "wrong credential":
            res.status(404).json({status:"failed",code: 404,msg:"Email atau Password salah"})
            break;
        case "Amount Limit Excedeed":
            res.status(400).json({status:"failed",code: 400,msg:"Limit exceded"})
            break;
        default:
            res.status(500).json({status:"failed",code: 500,msg:err})
            break;
    }
}

module.exports = errHandler;