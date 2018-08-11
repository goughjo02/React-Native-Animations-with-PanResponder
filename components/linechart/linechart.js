import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Path, Shape, Surface, Text } = ART;
import PropTypes from "prop-types";

import {
	convertDateTime,
	get_x_axes_points,
	getMinMax,
	getXScale,
	getYScale
} from "../../services";
import { Line } from "./line";
import { XAxis } from "./xAxis";

class LineChart extends React.Component {
	constructor(props) {
		super(props);
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
		var {
			graphWidth,
			graphHeight,
			linesWidth,
			linesHeight,
			curveOffsetTop,
			curveOffsetBottom,
			xScale,
			yScale,
			data,
			duration,
			xTickDist,
			yTickDist
		} = this.props;
		this.getScales(linesHeight, linesWidth, data);
		var timedata = data.map(e => e.date);
		var xAxisPoints = get_x_axes_points(xTickDist, linesWidth, timedata);
		var dateArray = [];
		xAxisPoints.forEach(e => {
			dateArray.push(new Date(e));
		});
		const styles = StyleSheet.create({
			main: {
				borderStyle: "solid",
				borderColor: "black",
				borderWidth: 3
			}
		});
		return (
			<React.Fragment>
				<Surface
					style={styles.main}
					width={graphWidth}
<<<<<<< HEAD
					height={graphHeight}
				>
					<Group x={graphWidth - linesWidth} y={curveOffsetTop}>
						<Line
							height={linesHeight}
							width={linesWidth}
							xScale={this.xScale}
							yScale={this.yScale}
							data={data}
							duration={duration}
						/>
					</Group>
					<Group x={graphWidth - linesWidth} y={linesHeight + curveOffsetBottom}>
						<XAxis
							xScale={this.xScale}
							yScale={this.yScale}
							dataPoints={dateArray}
						/>
					</Group>
				</Surface>
=======
					xScale={this.xScale}
					yScale={this.yScale}
					data={data}
					duration={duration}
				/>
				<XAxis
					xScale={this.xScale}
					yScale={this.yScale}
					dataPoints={dateArray}
					duration={duration}
				/>
>>>>>>> a5abbed5aff571695dea85cb54427d4d7f106630
			</React.Fragment>
		);
	}
}

LineChart.propTypes = {
	duration: PropTypes.number.isRequired,
	linesHeight: PropTypes.number.isRequired,
	linesWidth: PropTypes.number.isRequired,
	graphHeight: PropTypes.number.isRequired,
	graphWidth: PropTypes.number.isRequired,
	curveOffsetTop: PropTypes.number.isRequired,
	curveOffsetBottom: PropTypes.number.isRequired,
	xTickDist: PropTypes.number.isRequired,
	yTickDist: PropTypes.number.isRequired,
	color1: PropTypes.string.isRequired,
	color2: PropTypes.string.isRequired,
	color3: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			bought: PropTypes.number.isRequired,
			date: PropTypes.instanceOf(Date).isRequired,
			produced: PropTypes.number.isRequired,
			sold: PropTypes.number.isRequired,
			used: PropTypes.number.isRequired
		})
	)
};
LineChart.defaultProps = {
	linesHeight: 240,
	linesWidth: 260,
	graphHeight: 330,
	graphWidth: 300,
	duration: 2000,
	curveOffsetBottom: 60,
	curveOffsetTop: 20,
	xTickDist: 40,
	yTickDist: 40,
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff"
};

export { LineChart };
