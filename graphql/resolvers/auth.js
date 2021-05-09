const {User, Account} = require('../../models')
const {hash,compare} = require('../../helper/hash')
const { generateToken } = require('../../helper/jwt-help.js');

const auth = {
    Mutation: {
        register: async (_, args) => {
            try {
                const user = await User.create({
                    name: args.data.name,
                    email: args.data.email,
                    password: hash(args.data.password)
                })
                const account = await Account.create({
                    UserId: user.id,
                    type: "Taplus Muda",
                    balance: 500000
                })
                return {
                    message: "User Created",
                    status: 200,
                    data: {
                        email: user.email,
                        balance: account.balance
                    }
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        login: async (_, args) => {
            try {
                const {id,email,name,password} = await User.findOne({
                    where: {
                        email: args.credential.email,
                    }
                })
                if (id && compare(args.credential.password, password)) {
                    const token = generateToken({id, name, email})
                    return {
                        message: "Succseed Login",
                        status: 200,
                        data: {
                            name,
                            email,
                            token
                        }
                    }
                }else{
                    console.log("masuk sini", id);
                    throw new Error("Wrong Credential")
                }
            } catch (error) {
                throw new Error(error)
            }

        }
     }
}

module.exports =  auth