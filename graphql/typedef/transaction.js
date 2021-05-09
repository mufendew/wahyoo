const typedef = `
    type Account{
        id: ID,
        balance: Int,
        transactions : [Transaction]
    }
    type Transaction{
        id : ID,
        amount: Int,
        type: String,
        note: String,
        createdAt: String,
    }
    extend type Query {
        transaction(accountid:ID!, offset:Int!, limit:Int!) : Account
    }
    extend type Mutation {
        deposit(accountid:ID!, amount:Int!) : BaseResponse
        withdraw(accountid:ID!, amount:Int!) : BaseResponse
    }  
`;

module.exports = typedef