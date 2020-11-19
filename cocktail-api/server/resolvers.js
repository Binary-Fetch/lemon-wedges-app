const jwt = require("jsonwebtoken")
const { AuthenticationError } = require('apollo-server');
var admin = require("firebase-admin");
var serviceAccount = require("../lemon-wedges-app-file-upload.json");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://lemon-wedges-app-8ec61.appspot.com"
});

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
    recipeImageUpload: async (_, { file }, { dataSources, email }) => {
      if (!email) {
        throw new AuthenticationError('Unauthorized access!');
      }
      const { stream, filename, mimetype, encoding } = await file;
      var sysGenFileName = uuidv4() + '.jpg';
      let promise = new Promise((resolve, reject) => {
        var writeStream = fs.createWriteStream(sysGenFileName);
        stream.pipe(writeStream);
        stream.on('end', function () {
          let bucket = admin.storage().bucket();
          try {
            bucket.upload(
              sysGenFileName,
              {},
              function (error, file) {
                const config = {
                  action: 'read',
                  expires: '03-01-2500'
                };
                try {
                  //file removed
                  fs.unlinkSync(sysGenFileName)
                } catch (err) {
                  console.error(err)
                }
                file.getSignedUrl(config, (error, url) => {
                  if (error) {
                    console.log(error);
                  }
                  console.log('download url ', url);
                  resolve(url);
                });
              })
          } catch (error) {
            console.error(error);
          }
        });
      });
      let finalUrl = await promise;
      return {
        name: sysGenFileName,
        url: finalUrl
      }
    },
  },
};
