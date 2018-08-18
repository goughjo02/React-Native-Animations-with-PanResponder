import React from "react";
import { connect } from "react-redux";
import { Button, StyleSheet, Text, View } from "react-native";

import { login, saveJwt, loadJwt } from "../services";

//FAKE BACKEND
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthApi, AuthConstants } from "../config";
const mockApi = new MockAdapter(axios);
mockApi.onPost(AuthApi.loginUrl()).reply(config => {
	return [
		200,
		{ [AuthConstants.localStateKey()]: "tester token", user: "test" }
	];
});
/////////////

class SignInScreen extends React.Component {
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
				<Text>hello</Text>
				<Button title="Sign in!" onPress={this._signInAsync} />
			</View>
		);
	}

	_signInAsync = async () => {
		const { user, password } = this.props;
		await this.props.login(user, password);
		this.props.navigation.navigate("AuthLoading")
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-around"
	}
});

const mapStateToProps = state => {
	return {
		jwt: state.login[AuthConstants.localStateKey()]
	}
}
const mapDisPatchToProps = dispatch => {
	return {
		login: async (user, password) => {
			await dispatch(login(user, password));
		}
	};
};
const connectedSignIn = connect(
	mapStateToProps,
	mapDisPatchToProps
)(SignInScreen);

export { connectedSignIn as SignInScreen };
