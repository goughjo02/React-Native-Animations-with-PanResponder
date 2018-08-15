import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { login } from "../services";

export class SignInScreen extends React.Component {
	state = {
		user: "",
		password: ""
	};
	static navigationOptions = {
		title: "Please sign in"
	};

	render() {
		console.log("sign in screen")
		return (
			<View style={styles.container}>
				<Text>hello</Text>
				<Button title="Sign in!" onPress={this._signInAsync} />
			</View>
		);
	}

	_signInAsync = async () => {
		const { user, password } = this.props;
		await login(user, password);
		this.props.navigation.navigate("AuthLoading");
	};
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
