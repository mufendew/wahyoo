const { expect, it, beforeAll, afterAll } = require("@jest/globals")
const {User} = require("../models")
const request = require("supertest")
const app = require('../app')
const { hash } = require('../helper/hash')


afterAll(done=>{
    User.destroy({where: {email: "m.arkanmufadhoo@gmail.com"}})
    .then((data)=>{
        done()
    })
    .catch((err)=>{
        done()
    })
})


describe("POST /register success", () => {
    it("should return status code 200", function (done){
        const body = {
            name: "Mohammad Arkan Mufadho",
            email: "m.arkanmufadhoo@gmail.com",
            password: "88342232"
        }

        request(app)
            .post("/register")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(201)
                    expect(res.body).toHaveProperty("name")
                    expect(res.body).toHaveProperty("email")
                    expect(res.body).toHaveProperty("id")
                    done()
                }
                
            })
    })
})

describe("POST /register error", () => {
    it("should return status code 400 when email or name or password null", function (done) {
        const body = {

        }

        request(app)
            .post("/register")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toContain("User.name cannot be null")
                    expect(res.body.msg).toContain("User.email cannot be null")
                    expect(res.body.msg).toContain("User.password cannot be null")
                    done()
                }
                
            })
    })

    it("should return status code 400 when email not unique", function (done) {
        const body = {
            name: "Mohammad Arkan Mufadho",
            email: "m.arkanmufadhoo@gmail.com",
            password: "88342232"
        }

        request(app)
            .post("/register")
            .send(body)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(400)
                    expect(res.body.msg).toContain("email must be unique")
                    done()
                }
                
            })
    })

    
})