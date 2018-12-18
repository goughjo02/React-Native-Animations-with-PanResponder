import React from "react";
import { connect } from "react-redux";
import {
	ActivityIndicator,
	Button,
	Dimensions,
	KeyboardAvoidingView,
	StyleSheet,
	Image,
	Text,
	TextInput,
	View,
	TouchableOpacity
} from "react-native";

class MonoText extends React.Component {
	render() {
		return (
			<Text
				{...this.props}
				style={[this.props.style, { fontFamily: "space-mono" }]}
			/>
		);
	}
}

var windowWidth = Dimensions.get("window").width;
var windowHeight = Dimensions.get("window").height;
const secondaryColor = "#42D7DE";
const primaryColor = "#19695F";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		height: windowHeight,
		width: windowWidth
	},
	topContainer: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		height: 120,
		paddingTop: 40
	},
	secondContainer: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		height: 60,
		paddingTop: 0
	},
	topText: {
		fontSize: 24,
		color: "rgba(96,100,109, 1)",
		textAlign: "center"
	},
	logo: {
		width: 100,
		height: 70,
		resizeMode: "contain",
		marginTop: 3,
		marginLeft: -10
	},
	titleText: {
		fontSize: 30,
		color: "rgba(96,100,109, 1)",
		lineHeight: 37,
		textAlign: "center"
	},
	menuHolderTop: {
		flex: 1,
		marginHorizontal: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end"
	},
	menuHolderMiddle: {
		marginHorizontal: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	menuHolderBottom: {
		flex: 1,
		marginHorizontal: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-start"
	},
	menuOptions: {
		width: 105,
		height: 105,
		borderRadius: 4,
		backgroundColor: primaryColor,
		margin: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});
export class NavigatorScreen extends React.Component {
	constructor(props) {
		super(props);
	}
	static navigationOptions = {
		header: null
	};

	options = [
		{
			name: "support"
		},
		{
			name: "history"
		},
		{
			name: "financials"
		},
		{
			name: "user"
		},
		{
			name: "settings"
		},
		{
			name: "file"
		}
	];

	navigate = target => {
		this.props.navigation.navigate(target);
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Image
						source={require("../logo.png")}
						style={styles.logo}
					/>
					<Text style={styles.topText}>Powerbridge</Text>
				</View>
				<View style={styles.secondContainer}>
					<Text style={styles.titleText}>Dashboard</Text>
				</View>
				{
					//  <Button
					//   title="Go to Details... again"
					//   onPress={() => this.props.navigation.navigate('Chart')}
					// />
				}
				<View style={styles.menuHolderTop}>
					<TouchableOpacity
						style={styles.menuOptions}
						onPress={() => this.navigate("Chart")}
					/>
					<TouchableOpacity
						style={styles.menuOptions}
						onPress={() => this.navigate("Current")}
					/>
				</View>
				<View style={styles.menuHolderMiddle}>
					<TouchableOpacity
						style={styles.menuOptions}
						onPress={() => this.navigate("Settings")}
					/>
					<TouchableOpacity
						style={styles.menuOptions}
						onPress={() => this.navigate("Chart")}
					/>
				</View>
				<View style={styles.menuHolderBottom}>
					<TouchableOpacity
						style={styles.menuOptions}
						onPress={() => this.navigate("Current")}
					/>
					<TouchableOpacity
						style={styles.menuOptions}
						onPress={() => this.navigate("Settings")}
					/>
				</View>
			</View>
		);
	}
}
