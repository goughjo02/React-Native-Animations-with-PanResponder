import React from 'react';
import { PageOne, AuthLoadingScreen, SignInScreen } from "../pages";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
const AppStack = createStackNavigator({ Home: { screen: PageOne } });
const AuthStack = createStackNavigator({ SignIn: { screen: SignInScreen } });
export const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);