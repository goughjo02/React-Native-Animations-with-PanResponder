import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

import { configureFakBackend, RootStack } from './services';
import { configureStore, configureBasicStore } from "./redux";
let { store, persistor } = configureStore();
store = configureBasicStore();

configureFakBackend();


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
