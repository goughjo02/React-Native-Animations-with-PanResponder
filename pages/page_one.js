import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { faux_data } from "../__json_http__/dummy_data";

import {
	combination_selector,
	convertDateTime,
	fetchData,
	getSum
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
	render() {
		var { data } = this.props;
		var duration = 1000;
		var sumData = [];
		var keys = ["produced", "used", "sold"];
		for (var i = keys.length - 1; i >= 0; i--) {
			sumData.push({
				name: keys[i],
				value: getSum(data, keys[i])
			});
		}
		if (data.length > 0) {
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
					<Line data={data} duration={duration} />
					<XAxis />
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
