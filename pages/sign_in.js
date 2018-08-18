import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { login, saveJwt, loadJwt } from "../services";

//FAKE BACKEND
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JWTTOKEN, loginUrl } from "../config";
const mockApi = new MockAdapter(axios);
		//FAKE BACKEND
		mockApi.onPost(loginUrl).reply(config => {
			console.log("fake login post");
			return [200, { JWTTOKEN: "tester token", user: "test" }];
		});
		/////////////
/////////////

export class SignInScreen extends React.Component {
	state = {
		user: "",
		password: ""
	};
	static navigationOptions = {
		title: "Please sign in"
	};

	render() {
		console.log("sign in screen");
		return (
			<View style={styles.container}>
				<Text>hello</Text>
				<Button title="Sign in!" onPress={this._signInAsync} />
			</View>
		);
	}

	_signInAsync = async () => {
		const { user, password } = this.props;
		await saveJwt("test");
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
