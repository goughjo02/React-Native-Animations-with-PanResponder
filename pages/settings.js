import React from "react";
import { connect } from 'react-redux';
import { Button, Text, View } from "react-native";
import { fetchDataSuccess, loginSuccess } from "../redux";

class Settings extends React.Component {
	logout = () => {
		var { dispatch } = this.props;
		dispatch(loginSuccess(undefined));
		this.props.navigation.navigate("AuthLoading");
	}
	render() {
		return (
			<View>
				<Button title={"logout"} onPress={this.logout} />
			</View>
		);
	}
}

let connectedComponent = connect()(Settings);

export { connectedComponent as Settings }