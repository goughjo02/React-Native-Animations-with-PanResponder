import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from "./redux";



// CONFIGURE REACT - NAVIGATION
import { PageOne, AuthLoadingScreen, SignInScreen } from "./pages";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
const AppStack = createStackNavigator({ Home: { screen: PageOne } });
const AuthStack = createStackNavigator({ SignIn: { screen: SignInScreen } });
const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
//--------------------------------------


let { store, persistor } = configureStore()

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
