const { expect, it, beforeAll, afterAll } = require("@jest/globals")
const {User, Account} = require("../models")
const request = require("supertest")
const app = require('../app')
const { hash } = require('../helper/hash')
const { generateToken } = require('../helper/jwt-help')



let token
let account

beforeAll((done)=>{
    User.findOne({
        where : {
            email : "transaction@gmail.com"
        },
    })
    .then((data)=>{
        token = generateToken({id: data.id, email: data.email})
        return Account.findOne({
            where: {
                UserId: data.id
            }
        })
    })
    .then((data)=>{
        account = data
        done()
    })
    .catch((err)=>{
        done(err)
    })
})



describe("POST /deposit success", () => {
    it("should return status code 201", function (done){
        const body = {
            amount: 500000,
            accountid: account.id
        }

        request(app)
            .post("/transaction/deposit")
            .set("token",token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(201)
                    expect(res.body).toHaveProperty("balance")
                    done()
                }
                
            })
    })
})

describe("POST /withdraw success", () => {
    it("should return status code 201", function (done){
        const body = {
            amount: 500000,
            accountid: account.id
        }

        request(app)
            .post("/transaction/withdraw")
            .set("token",token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(201)
                    expect(res.body).toHaveProperty("balance")
                    done()
                }
                
            })
    })
})

describe("POST /withdraw error", () => {
    it("should return status code 400 when amount null", function (done){
        const body = {
            accountid: account.id
        }

        request(app)
            .post("/transaction/withdraw")
            .set("token",token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toContain("Transaction.amount cannot be null")
                    done()
                }
                
            })
    })

    it("should return status code 400 when limit exceded", function (done){
        const body = {
            amount: 100000000,
            accountid: account.id
        }

        request(app)
            .post("/transaction/withdraw")
            .set("token",token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toContain("Limit exceded")
                    done()
                }
                
            })
    })
})

describe("POST /deposit error", () => {
    it("should return status code 400 when amount null", function (done){
        const body = {
            accountid: account.id
        }

        request(app)
            .post("/transaction/deposit")
            .set("token",token)
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toContain("Transaction.amount cannot be null")
                    done()
                }
                
            })
    })
})

