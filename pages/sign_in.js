import React from "react";
import { connect } from "react-redux";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";

import { login, saveJwt, loadJwt } from "../services";
import { Logo } from "../components";

//FAKE BACKEND
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthApi, AuthConstants } from "../config";
const mockApi = new MockAdapter(axios, { delayResponse: 2000 });
mockApi.onPost(AuthApi.loginUrl()).reply(config => {
	let parsed = JSON.parse(config.data);
	// console.log("fake backend sign in")
	// console.log(parsed)
	var users = [
		{
			id: 1,
			username: "joe",
			password: "password"
		}
	];
	var reqUser = parsed.username;
	var reqPassword = parsed.password;
	let filteredUsers = users.filter(user => {
		// console.log(user.username === reqUser && user.password === reqPassword)
		// console.log(user.username, user, user.password, password)
		return (
			user.username.toLowerCase() === reqUser.toLowerCase() &&
			user.password.toLowerCase() === reqPassword.toLowerCase()
		);
	});
	// console.log(filteredUsers)
	if (filteredUsers.length) {
		let user = filteredUsers[0].username;
		return [
			200,
			{ [AuthConstants.localStateKey()]: "tester token", user: user }
		];
	} else return [401, { text: "user not recognised" }];
});
/////////////

class SignInScreen extends React.Component {
	state = {
		username: "",
		password: ""
	};
	static navigationOptions = {
		title: "Please sign in"
	};
	render() {
		let { error, loading } = this.props;
		return (
			<View style={styles.container}>
				<Logo />
				<View>
					<TextInput
						style={{
							height: 40,
							width: 200,
							borderColor: "gray",
							borderWidth: 1
						}}
						onChangeText={text => this.setState({ username: text })}
						value={this.state.username}
					/>
					<TextInput
						style={{
							height: 40,
							width: 200,
							borderColor: "gray",
							borderWidth: 1
						}}
						onChangeText={text => this.setState({ password: text })}
						value={this.state.password}
					/>
				</View>
				<View>
					{error && <Text>Incorrect usernme or password.</Text>}
					{loading && <ActivityIndicator size="large" color="#0000ff"/>}
				</View>
				<Button title="Sign in!" onPress={this._signInAsync} />
			</View>
		);
	}

	_signInAsync = async () => {
		const { username, password } = this.state;
		await this.props.login(username, password);
		this.props.navigation.navigate("AuthLoading");
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
		jwt: state.login[AuthConstants.localStateKey()],
		error: state.login.iserror,
		loading: state.login.isloading
	};
};
const mapDisPatchToProps = dispatch => {
	return {
		login: async (username, password) => {
			await dispatch(login(username, password));
		}
	};
};
const connectedSignIn = connect(
	mapStateToProps,
	mapDisPatchToProps
)(SignInScreen);

export { connectedSignIn as SignInScreen };
