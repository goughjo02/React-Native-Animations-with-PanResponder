import React from 'react';
import { PageOne, AuthLoadingScreen, Settings, SignInScreen } from "../pages";
import { createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator } from "react-navigation";
const AppStack = createStackNavigator({ Home: { screen: PageOne } });
const AuthStack = createStackNavigator({ SignIn: { screen: SignInScreen } });


export const TabStack = createMaterialTopTabNavigator({
  Home: PageOne,
  Settings: Settings,
});

export const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabStack,
    Auth: AuthStack
  },
  {
  	headerMode: 'screen',
    initialRouteName: "AuthLoading"
  }
);
