const jwt = require("jsonwebtoken")
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    login: async (_, { username, password }, { dataSources }) => {
      const user = await dataSources.userAPI.getUsers(username);
      console.log(user);
      if (user) {
        const token = jwt.sign(
          { username: user.username, email: user.email },
          "secret_key",
          { expiresIn: 60 * 60 }
        );
        const loginResponse = {
          token: token,
          username: user.username,
          name: user.name,
          gender: user.gender,
          email: user.email
        }
        return loginResponse;
      }
      if (!user) {
        console.log("User not in database.");
      }
    },
    getUser: (_, {  first, offset }, { dataSources, email , username}) => {
      if (!email) {
        throw new AuthenticationError('Unauthorized access!');
      }
      return dataSources.userAPI.getUsers(username, first, offset)
    },
    coctailRecipe: (_, { first, offset }, { dataSources, email }) => {
      if (!email) {
        throw new AuthenticationError('Unauthorized access!');
      }
      return dataSources.cocktailAPI.getCocktailDetails(first, offset);
    },
  },
  Mutation: {
    saveUser: async (_, { user }, { dataSources }) => {
      const results = await dataSources.userAPI.saveUsers({ user });
      return results;
    },
    saveRecipe: async (_, { recipe }, { dataSources }) => {
      const results = await dataSources.cocktailAPI.saveRecipe({ recipe });
      return results;
    },
    singleUpload: async (_, { args }, { dataSources }) => {
      return args.file.then((file) => {
        //Contents of Upload scalar: https://github.com/jaydenseric/graphql-upload#class-graphqlupload
        //file.createReadStream() is a readable node stream that contains the contents of the uploaded file
        //node stream api: https://nodejs.org/api/stream.html
        return file;
      });
    },
  },
};
