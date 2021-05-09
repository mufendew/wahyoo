const { expect, it, beforeAll, afterAll } = require("@jest/globals")
const {User} = require("../models")
const request = require("supertest")
const app = require('../app')
const { hash } = require('../helper/hash')

beforeAll((done)=>{
    User.create({
        email : "m.arkanmufadho@gmail.com",
        password : hash("88342232")
    })
    .then((data)=>{
        done()
    })
    .catch((err)=>{
        done(err)
    })
})
afterAll(done=>{
    User.destroy({where: {email: "m.arkanmufadho@gmail.com"}})
    .then((data)=>{
        done()
    })
    .catch((err)=>{
        err()
    })
})


describe("POST /Login success", () => {
    it("should return status code 200", function (done){
        const body = {
            email: "m.arkanmufadho@gmail.com",
            password: "88342232"
        }

        request(app)
            .post("/login")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(200)
                    expect(res.body).toHaveProperty("token")
                    done()
                }
                
            })
    })
})

describe("POST /login error", () => {
    it("should return status code 404 when password and email wrong", function (done) {
        const body = {
            email: "m.arkanmuho@gmail.com",
            password: "88342"
        }

        request(app)
            .post("/login")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(404)
                    expect(res.body.msg).toEqual("Email atau Password salah")
                    done()
                }
                
            })
    })

    it("should return status code 404 when user not found", function (done) {
        const body = {
            email: "m.arkanmuf@gmail.com",
            password: "88342232"
        }

        request(app)
            .post("/login")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(404)
                    expect(res.body.msg).toEqual("Email atau Password salah")
                    done()
                }
                
            })
    })

    it("should return status code 404 when user not insert credential", function (done) {
        const body = {
            email: "",
            password: ""
        }

        request(app)
            .post("/login")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(404)
                    expect(res.body.msg).toEqual("Email atau Password salah")
                    done()
                }
                
            })
    })
})