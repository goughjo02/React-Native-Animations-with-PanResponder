import React from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { faux_data } from "../__json_http__/dummy_data";

import {
	combination_selector,
	convertDateTime,
	fetchData,
	getSum,
	deleteJwt
} from "../services";
import { Legend, LineChart, RadialChart, ZoomSlider } from "../components";
import { fetchDataSuccess } from "../redux";

class PageOne extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: "Dashboard",
			headerRight:
				navigation.state.params && navigation.state.params.headerRight
		};
	};
	logout() {
		deleteJwt();
		this.props.navigation.navigate("AuthLoading");
	}
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}
	componentDidMount() {
		this.props.navigation.setParams({
			headerRight: (
				<Button onPress={this.logout} title="Log out" color="#000" />
			)
		});
		if (typeof faux_data[0].date !== typeof new Date()) {
			faux_data.forEach(e => {
				var pdate = convertDateTime(e.date);
				e.date = pdate;
			});
		}
		this.props.dispatch(fetchDataSuccess(faux_data));
	}
	render() {
		// console.log(this.props.navigation);
		var duration = 1000;
		var { data } = this.props;
		var keys = ["produced", "used", "sold"];
		var sumData = [];
		for (var i = keys.length - 1; i >= 0; i--) {
			sumData.push({
				name: keys[i],
				value: getSum(data, keys[i])
			});
		}
		var windowWidth = Dimensions.get("window").width;
		var linesWidth = windowWidth - 60;
		if (data.length > 0) {
			return (
				<React.Fragment>
					<View style={styles.one}>
						<RadialChart
							data={sumData}
							radius={45}
							strokeWidth={4}
							offsetFactor={2.5}
							maxAngle={360}
						/>
						<Legend data={sumData} duration={duration} />
					</View>
					<View style={styles.two}>
						<LineChart
							data={data}
							backgroundColor={"#fff"}
							graphWidth={windowWidth}
							linesWidth={linesWidth}
							yInnerTick={linesWidth}
						/>
					</View>
					<View style={styles.three}>
						<ZoomSlider
							dataLength={data.length}
							backgroundColor={"#ccc"}
							color={"#666"}
						/>
					</View>
				</React.Fragment>
			);
		}
		return <Text>No data present</Text>;
	}
}

const styles = StyleSheet.create({
	one: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-around"
	},
	two: {
		flex: 1
	},
	three: {
		height: 180,
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-around"
	}
});

const mapStateToProps = state => {
	return {
		data: combination_selector(
			state.data.data,
			state.range.start,
			state.range.end,
			state.zoom.start,
			state.zoom.end
		)
	};
};

const ConnectedPage = connect(mapStateToProps)(PageOne);

export { ConnectedPage as PageOne };
