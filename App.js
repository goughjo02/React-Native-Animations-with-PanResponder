import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import throttle from "lodash/throttle";

import { root_reducer } from "./redux";
import { PageOne, AuthLoadingScreen, SignInScreen } from "./pages";
import { loadJwt, saveJwt, NavigationService } from "./services";

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

let store = createStore(root_reducer, applyMiddleware(thunk));
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // let persistedState = loadJwt();
    // this.store = createStore(
    //   root_reducer,
    //   applyMiddleware(thunk)
    // );
  }
  componentDidMount() {
    // this.store.subscribe(
    //   throttle(() => {
    //     saveJwt(this.store.getState());
    //   }, 1000)
    // );
  }
  render() {
    // console.log(NavigationService)
    return (
      <Provider store={store}>
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
