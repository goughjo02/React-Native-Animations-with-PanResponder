import React from "react";
import { Button, View } from "react-native";

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
		return (
			<View style={styles.container}>
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
