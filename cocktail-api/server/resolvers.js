const jwt = require("jsonwebtoken")
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    login: async (_, { username, password }, { dataSources }) => {
      const user = await dataSources.userAPI.verifyUserDetails(username, password);
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
    getUser: (_, { first, offset }, { dataSources, email, username }) => {
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
    saveRecipe: async (_, { recipe }, { dataSources, email }) => {
      if (!email) {
        throw new AuthenticationError('Unauthorized access!');
      }
      const results = await dataSources.cocktailAPI.saveRecipe({ recipe });
      return results;
    },
    recipeImageUpload: async (_, { file }, { dataSources }) => {
      const { uri, name, type } = await file;
      // Do work 💪
      return { 
        name,
        url: 'https://www.ndtv.com/cooks/images/sangria-new.jpg' 
      }
    },
  },
};
