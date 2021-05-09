const typedef = `
    input registerInput {
        name: String!
        email: String!
        password: String!
    }
    input loginInput {
        email: String!
        password: String!
    }
    extend type Query {
        hi : String
    }
    extend type Mutation {
        login(credential: loginInput) : BaseResponse
        register(data: registerInput) : BaseResponse
    }  
`;

module.exports = typedef