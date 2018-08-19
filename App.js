import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native



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

// CONFIGURE REDUX STORE
import { root_reducer } from "./redux";
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, root_reducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

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
