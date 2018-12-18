import React from "react";
import { connect } from 'react-redux';
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { fetchDataSuccess, loginSuccess } from "../redux";


var styles = StyleSheet.create({
	main: {
		flex: 1,
		alignSelf: "stretch",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-around",
		width: Dimensions.get('window').width
	},
});

class Settings extends React.Component {
	logout = () => {
		var { dispatch } = this.props;
		dispatch(loginSuccess(undefined));
		this.props.navigation.navigate("AuthLoading");
	}
	goHome = () => {
		this.props.navigation.navigate("Nav");
	}
	render() {
		return (
			<View style={styles.main}>
				<Button title={"logout"} onPress={this.logout} />
				<Button title={"home"} onPress={this.goHome} />
			</View>
		);
	}
}

let connectedComponent = connect()(Settings);

export { connectedComponent as Settings }