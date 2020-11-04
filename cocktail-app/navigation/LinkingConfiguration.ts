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
      UserRegistration: {
        screens: {
          UserRegistration: 'userregistration'
        }
      },
      DetailRecipe: {
        screens: {
          DetailRecipe: 'detailrecipe',
        },
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
