import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from './src/screens/Home'
import ReadNdf from './src/screens/ReadNdf'
import Account from './src/screens/Account'
import WriteNdf from './src/screens/WriteNdf'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import { Provider as AuthProvider } from './src/context/authContext'
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Home: Home,
    Tag: ReadNdf,
    Account: Account
    // navigationOptions: {
    //   headerTitleStyle: {
    //     fontSize: "200"
    //   }
    // }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={navigator => setNavigator(navigator)} />
    </AuthProvider>
  );
};

