import React from 'react';
import { History, Current, AuthLoadingScreen, Settings, SignInScreen } from "../pages";
import { createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator } from "react-navigation";

import { NavigatorScreen } from "../pages/Navigator";
const AuthStack = createStackNavigator({ SignIn: { screen: SignInScreen } });


const tabBarOptions = {
  labelStyle: {
    fontSize: 12,
  },
  tabStyle: {
  },
  style: {
  	paddingTop: 26,
    backgroundColor: '#607a89',
  },
}

export const TabStack = createMaterialTopTabNavigator({
  History: History,
  Current: Current,
  Settings: Settings,
}, {
	tabBarOptions: tabBarOptions
});


export const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabStack,
    Auth: AuthStack,
    Nav: NavigatorScreen,
    Chart: History,
    Settings: Settings,
    Current: Current
  },
  {
  	headerMode: 'screen',
    initialRouteName: "AuthLoading"
  }
);
