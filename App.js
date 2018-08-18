import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import throttle from "lodash/throttle";

import { root_reducer } from "./redux";
import { PageOne, AuthLoadingScreen, SignInScreen } from "./pages";
import { loadState, saveState } from "./services";



const AppStack = createStackNavigator({ Home: PageOne });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "App"
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let persistedState = loadState();
    this.store = createStore(
      root_reducer,
      persistedState,
      applyMiddleware(thunk)
    );
  }
  componentDidMount() {
    this.store.subscribe(
      throttle(() => {
        saveState(this.store.getState());
      }, 1000)
    );
  }
  render() {
    return (
      <Provider store={this.store}>
        <RootStack />
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
