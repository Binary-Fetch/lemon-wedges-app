import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      LoginSplash: {
        screens: {
          LoginSplash: 'loginsplash'
        }
      },
      SignIn: {
        screens: {
          SignIn: 'signin'
        }
      },
      Root: {
        screens: {
          HomeScreen: {
            screens: {
              HomeScreen: 'home',
            },
          },
          MyAccount: {
            screens: {
              MyAccount: 'myaccount',
            },
          },
          UploadRecipe: {
            screens: {
              UploadRecipe: 'uploadrecipe',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
