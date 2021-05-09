const schema = require('./graphql/schema')
const verify = require('./graphql/utils/verifToken')
const { ApolloServer } = require('apollo-server-express');

const server = new ApolloServer({
    schema,
    context:({req})=>{
      return{
        user:verify(req.headers.token)
      }
    }
});

module.exports = server