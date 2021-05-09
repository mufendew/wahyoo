const {User, Account, Transaction} = require('../../models')

const resolvers = {
    Query:{
        transaction : async (_,args,{user}) =>{
            if (!user) throw new Error("unauthenticate")

            try {
                const account = await Account.findOne({
                    where: {
                        id: args.accountid,
                    },
                    include: [
                        {
                            model: Transaction,
                            separate : true,
                            limit: args.limit,
                            offset: args.offset,
                        }
                    ]
               })
               console.log(account);
               return{
                   id: account.id,
                   balance: account.balance,
                   transactions: account.Transactions
               }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        deposit: async (_, args, {user}) => {
            if (!user) throw new Error("unauthenticate")

            try {
                const transaction = await Transaction.create({
                    AccountId: args.accountid,
                    UserId: user.id,
                    amount: args.amount,
                    type: "debet"
                })
                const account = await Account.findOne({
                    where: {
                        id: args.accountid,
                    }
                })
                return {
                    message: "Transaction deposit Success",
                    status: 200,
                    data: {
                        transaction,
                        account

                    }
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        withdraw: async (_, args) => {
            if (!user) throw new Error("unauthenticate")

            try {
                const transaction = await Transaction.create({
                    AccountId: args.accountid,
                    UserId: user.id,
                    amount: args.amount,
                    type: "credit"
                })
                const account = await Account.findOne({
                    where: {
                        id: args.accountid,
                    }
                })
                return {
                    message: "Transaction deposit Success",
                    status: 200,
                    data: {
                        transaction,
                        account

                    }
                }
            } catch (error) {
                throw new Error(error)
            }
        }
     }
}

module.exports =  resolvers