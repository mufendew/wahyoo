const { makeExecutableSchema } = require('apollo-server-express');
const resolvers = require("./resolvers")
const typdef = require("./typedef")

const query = `
    scalar JSON
    type BaseResponse{
        message: String!,
        status:Int!,
        data:JSON!
    }
    type Query 
    type Mutation 
`;

const schema = makeExecutableSchema({
  typeDefs: [query,...typdef],
  resolvers,
});

module.exports = schema