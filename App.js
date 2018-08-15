import React from "react";
import { StyleSheet, View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { root_reducer } from "./redux";
import { PageOne, AuthLoadingScreen } from "./pages";

const store = createStore(root_reducer, applyMiddleware(thunk));

const AppStack = createStackNavigator({ Home: PageOne });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: AuthLoading,
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RootStack />
        </View>
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
