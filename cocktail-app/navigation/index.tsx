import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { connect } from 'react-redux';
import ResourceLoader from '../components/ResourceLoader';
import DetailRecipeScreen from '../screens/DetailsRecipeScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SignInScreen from '../screens/SignInScreen';
import UserRegistrationScreen from '../screens/UserRegistrationScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
function Navigation({ colorScheme, authentication }: { colorScheme: ColorSchemeName,  authentication: any}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
      <RootNavigator authState={authentication} />
    </NavigationContainer>
  );
}

const mapStateToProps = (state: any, ownProps: any) => {
  const {authentication} = state;
  return {authentication, ownProps};
}

export default connect(mapStateToProps)(Navigation);

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator({authState}: {authState: any}) {
  //const [state, dispatch] = useAuthenticationReducer(); 
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
          authState.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="LoginSplash" component={ResourceLoader} />
          ) : authState.userToken == null ? (
            // No token found, user isn't signed in
            <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
            // When logging out, a pop animation feels intuitive
                animationTypeForReplace: authState.isSignout ? 'pop' : 'push',
              }}
            />
            <Stack.Screen name="UserRegistration" component={UserRegistrationScreen} />
            </>
          ) : (
            // User is signed in
            <>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="DetailRecipe" component={DetailRecipeScreen} />
            </>
          )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
