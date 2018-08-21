import React from "react";
import { connect } from "react-redux";
import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";

import { login, saveJwt, loadJwt } from "../services";
import { Logo } from "../components";
import { AuthConstants } from "../config";

class SignInScreen extends React.Component {
	state = {
		username: "",
		password: ""
	};
	static navigationOptions = {
   header: null,
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
					{loading && (
						<ActivityIndicator size="large" color="#0000ff" />
					)}
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
