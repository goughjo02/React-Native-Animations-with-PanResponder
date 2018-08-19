import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { AuthConstants } from "../config";
import { connect } from 'react-redux';
import { loadJwt, saveJwt } from "../services";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkJwt();
  }

  checkJwt = async () => {
    var { jwt } = this.props;
    this.props.navigation.navigate(jwt ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => {
  return {
    jwt: state.login[AuthConstants.localStateKey()]
  }
}

let connectedAuthLoadingScreen = connect(mapStateToProps)(AuthLoadingScreen);

export { connectedAuthLoadingScreen as AuthLoadingScreen };
