import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { faux_data } from "../__json_http__/dummy_data";

import {
	combination_selector,
	convertDateTime,
	fetchData,
	getSum,
	get_x_axes_points,
	getMinMax,
	getXScale,
	getYScale
} from "../services";
import { Legend, Line, RadialChart, ZoomSlider, XAxis } from "../components";
import { fetchDataSuccess } from "../redux";

class PageOne extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		faux_data.forEach(e => {
			var pdate = convertDateTime(e.date);
			e.date = pdate;
		});
		this.props.dispatch(fetchDataSuccess(faux_data));
	}
	getScales = (height, width, data) => {
		var time = getMinMax(data, "date");
		var minValue = Math.min(
			getMinMax(data, "produced").min,
			getMinMax(data, "used").min,
			getMinMax(data, "sold").min
		);
		var maxValue = Math.max(
			getMinMax(data, "produced").max,
			getMinMax(data, "used").max,
			getMinMax(data, "sold").max
		);
		this.xScale = getXScale(time.min, time.max, width);
		this.yScale = getYScale(minValue, maxValue, height);
	};
	render() {
		var { data } = this.props;
		var duration = 1000;
		var graphHeight = 170;
		var graphWidth = 300;
		var keys = ["produced", "used", "sold"];
		var sumData = [];
		for (var i = keys.length - 1; i >= 0; i--) {
			sumData.push({
				name: keys[i],
				value: getSum(data, keys[i])
			});
		}
		if (data.length > 0) {
			this.getScales(graphHeight, graphWidth, data);
			var timedata = data.map(e => e.date);
			var xAxisPoints = get_x_axes_points(40, 170, timedata);
			var dateArray = [];
			xAxisPoints.forEach(e => {
				dateArray.push(new Date(e));
			});
			return (
				<React.Fragment>
					<View style={styles.one}>
						<RadialChart
							data={sumData}
							radius={45}
							strokeWidth={6}
							offsetFactor={2}
						/>
						<Legend data={sumData} duration={duration} />
					</View>
					<Line
						height={graphHeight}
						width={graphWidth}
						xScale={this.xScale}
						yScale={this.yScale}
						data={data}
						duration={duration}
					/>
					<XAxis
						xScale={this.xScale}
						yScale={this.yScale}
						dataPoints={dateArray}
					/>
					<ZoomSlider dataLength={data.length} />
				</React.Fragment>
			);
		}
		return <Text>No data present</Text>;
	}
}

const styles = StyleSheet.create({
	one: {
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
