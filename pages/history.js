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
import { fetchDataSuccess, loginSuccess } from "../redux";

var windowWidth = Dimensions.get("window").width;
var windowHeight = Dimensions.get("window").height;

class History extends React.Component {
	static navigationOptions = {
		header: null
	};
	selectLayout() {
		let portrait =
			Dimensions.get("window").width < Dimensions.get("window").height;
		this.setState({ portrait });
	}
	getLayout() {
		let { portrait } = this.state;
		return portrait ? portrait : landscape;
	}
	constructor(props) {
		super(props);
		let portrait =
			Dimensions.get("window").width < Dimensions.get("window").height;
		this.state = {
			portrait
		};
		this.selectLayout = this.selectLayout.bind(this);
		this.getLayout = this.getLayout.bind(this);
	}
	componentDidMount() {
		Dimensions.addEventListener("change", () => {
			this.selectLayout();
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
		let { portrait } = this.state;
		var keys = ["produced", "used", "sold"];
		var sumData = [];
		for (var i = keys.length - 1; i >= 0; i--) {
			sumData.push({
				name: keys[i],
				value: getSum(data, keys[i])
			});
		}
		if (data.length > 0) {
			if (portrait) {
				var linesWidth = windowWidth - 100;
				var graphWidth = windowWidth - 40;
				var linesHeight = 130;
				var graphHeight = 190;
				return (
					<React.Fragment>
						<View style={portraitStyles.main}>
							<View style={portraitStyles.instruments}>
								<RadialChart
									data={sumData}
									radius={45}
									strokeWidth={4}
									offsetFactor={2.5}
									maxAngle={360}
								/>
								<Legend data={sumData} duration={duration} />
							</View>
							<View style={portraitStyles.linechart}>
								<LineChart
									data={data}
									backgroundColor={"#fff"}
									graphHeight={graphHeight}
									linesHeight={linesHeight}
									graphWidth={graphWidth}
									linesWidth={linesWidth}
									yInnerTick={linesWidth}
									xInnerTick={linesHeight}
								/>
							</View>
							<View style={portraitStyles.slider}>
								<ZoomSlider
									dataLength={data.length}
									backgroundColor={"#ccc"}
									color={"#666"}
								/>
							</View>
						</View>
					</React.Fragment>
				);
			} else {
				return (
					<React.Fragment>
						<View style={landscape.main}>
							<View style={landscape.linechart}>
								<LineChart
									data={data}
									backgroundColor={"#fff"}
									graphHeight={graphHeight}
									linesHeight={linesHeight}
									graphWidth={graphWidth}
									linesWidth={linesWidth}
									yInnerTick={linesWidth}
									xInnerTick={linesHeight}
								/>
							</View>
							<View style={landscape.instruments}>
								<RadialChart
									data={sumData}
									radius={45}
									strokeWidth={4}
									offsetFactor={2.5}
									maxAngle={360}
								/>
								<Legend data={sumData} duration={duration} />
								<View style={landscape.slider}>
									<ZoomSlider
										dataLength={data.length}
										backgroundColor={"#ccc"}
										color={"#666"}
									/>
								</View>
							</View>
						</View>
					</React.Fragment>
				);
			}
		}
		return <Text>No data present</Text>;
	}
}

var portraitStyles = StyleSheet.create({
	main: {
		flex: 1,
		alignSelf: "stretch",
		flexDirection: "column",
		justifyContent: "space-around",
		width: windowWidth,
	},
	instruments: {
		flex: 1,
		alignSelf: "stretch",
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "center",
		justifyContent: "space-around"
	},
	linechart: {
		flex: 1,
		alignSelf: "stretch",
		justifyContent: "center",
		alignItems: "center"
	},
	three: {
		height: 180,
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-around"
	},
	slider: {
		height: 180,
		width: windowWidth,
		justifyContent: "center",
		alignItems: "center"
	}
});

const landscape = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: "row",
		padding: 20
	},
	instruments: {
		flex: 1,
		flexDirection: "column",
		flexWrap: "nowrap",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "space-around",
		backgroundColor: "#000"
	},
	linechart: {
		flex: 1,
		alignSelf: "stretch"
	},
	slider: {
		height: 100,
		width: (Dimensions.get("window").width - 60) / 2,
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

const ConnectedPage = connect(mapStateToProps)(History);

export { ConnectedPage as History };
