import { Ionicons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image } from "react-native";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import HomeScreen from '../screens/HomeScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import { BottomTabParamList, HomeParamList, TabTwoParamList, UploadRecipeParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeTabNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }: {color: string}) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="UploadRecipe"
        component={TabUploadRecipeNavigator}
        options={{
          tabBarLabel: "Upload Recipe",
          tabBarIcon: ({ color }: {color: string}) => <TabBarAntIcon name="upload" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MyAccount"
        component={TabTwoNavigator}
        options={{
          tabBarLabel: "My Recipe",
          tabBarIcon: ({ color }: {color: string} ) => <TabBarIcon name="ios-list" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarAntIcon(props: {name: string; color: string}) {
  return <AntDesign size={30} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator<HomeParamList>();

function HomeTabNavigator() {
  return (
    <TabHomeStack.Navigator>
      <TabHomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ 
          headerTitle: ' ', 
          headerBackground: props => (
            <Image
            style={{ width: 104, height: 60, marginTop: 15, marginLeft: 8 }}
            source={require('../assets/images/lemon_wedges.png')}
          />
        )}}
      />
    </TabHomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{ 
          headerTitle: ' ', 
          headerBackground: props => (
            <Image
            style={{ width: 104, height: 60, marginTop: 15, marginLeft: 8 }}
            source={require('../assets/images/lemon_wedges.png')}
          />
        )}}
      />
    </TabTwoStack.Navigator>
  );
}

const UploadRecipeStack = createStackNavigator<UploadRecipeParamList>();

function TabUploadRecipeNavigator() {
  return (
    <UploadRecipeStack.Navigator>
      <UploadRecipeStack.Screen
        name="UploadRecipe"
        component={CreateRecipeScreen}
        options={{ 
          headerTitle: ' ', 
          headerBackground: props => (
            <Image
            style={{ width: 104, height: 60, marginTop: 15, marginLeft: 8 }}
            source={require('../assets/images/lemon_wedges.png')}
          />
        )}}
      />
    </UploadRecipeStack.Navigator>
  );
}
