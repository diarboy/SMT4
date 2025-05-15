import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './Screens/Login.js';
import SignUp from './Screens/SignUp.js';
import HomeScreen from '../pemrograman-mobile/meet-06/stack-nav/Screens/HomeScreen.js';
import ProfileScreen from '../pemrograman-mobile/meet-06/stack-nav/Screens/ProfileScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {/* Halaman Login */}
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'Sign In' }}
        />
        {/* Halaman Signup */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Sign Up' }}
        />
        {/* Halaman Utama (BottomTabs) */}
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}