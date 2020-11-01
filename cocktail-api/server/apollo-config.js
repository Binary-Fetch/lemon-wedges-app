const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require("jsonwebtoken")
const { createStore } = require('./utils')

const UserAPI = require('./datasources/user');
const CocktailAPI = require('./datasources/cocktail');

const store = createStore()


const apolloServer = new ApolloServer({
    context: async ({ req }) => {
        //simple auth chech on every request
        const auth = (req.headers && req.headers.authorization) || '';
        let email = ""
        let token = ""
        let username = ""
        const getToken = () => {
            return auth.split(" ")[1]
        }
        if (auth.length && auth.split(" ")[1]) {
            token = getToken()
        }
        if (token !== "") {
            // Config for check token
            // username = jwt.verify(token, "secret_key").username
            // console.log(username)
            // email = jwt.verify(token, "secret_key").email
            // let user = {
            //     username: username,
            //     email: email
            // }
            // return user;
        }
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        cocktailAPI: new CocktailAPI(),
        userAPI: new UserAPI({ store })
    })
});

module.exports = apolloServer;
