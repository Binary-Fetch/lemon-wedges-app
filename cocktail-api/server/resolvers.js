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
      const { stream, filename, mimetype, encoding } = await file;
      // Do work 💪
      return { 
        filename, 
        mimetype, 
        encoding, 
        url: 'https://www.thespruceeats.com/thmb/Vh9Ari_ojFCPvKtb1D5rIqqh2ZA=/3828x3828/smart/filters:no_upscale()/_kamikaze-cocktail-recipe-759313-hero-5bb7c7e846e0fb0051ee4eb4.jpg' }
    },
  },
};
