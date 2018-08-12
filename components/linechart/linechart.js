import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Path, Shape, Surface, Text } = ART;
import PropTypes from "prop-types";

import {
	convertDateTime,
	get_x_axes_points,
	get_y_axes_points,
	getMinMax,
	getXScale,
	getYScale
} from "../../services";
import { Line } from "./line";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";

class LineChart extends React.Component {
	constructor(props) {
		super(props);
	}
	getScales = (height, width, data) => {
		var time = getMinMax(data, "date");
		this.minValue = Math.min(
			getMinMax(data, "produced").min,
			getMinMax(data, "used").min,
			getMinMax(data, "sold").min
		);
		this.maxValue = Math.max(
			getMinMax(data, "produced").max,
			getMinMax(data, "used").max,
			getMinMax(data, "sold").max
		);
		this.xScale = getXScale(time.min, time.max, width);
		this.yScale = getYScale(this.minValue, this.maxValue, height);
	};
	render() {
		var {
			lineStrokeWidth,
			xStrokeWidth,
			yStrokeWidth,
			graphWidth,
			graphHeight,
			linesWidth,
			linesHeight,
			curveOffsetTop,
			curveOffsetBottom,
			curveOffsetRight,
			xScale,
			yScale,
			data,
			duration,
			xTickDist,
			yTickDist,
			xInnerTick,
			xOuterTick,
			yInnerTick,
			yOuterTick,
			yFontSize,
			xFontSize
		} = this.props;
		this.getScales(linesHeight, linesWidth, data);
		var timedata = data.map(e => e.date);
		var xAxisPoints = get_x_axes_points(xTickDist, linesWidth, timedata);
		var yAxisPoints = get_y_axes_points(
			this.minValue,
			this.maxValue,
			yTickDist,
			linesHeight
		);
		var dateArray = [];
		xAxisPoints.forEach(e => {
			dateArray.push(new Date(e));
		});
		const styles = StyleSheet.create({
			main: {
				borderStyle: "solid",
				borderColor: "#000",
				borderWidth: 3,
				backgroundColor: '#666'
			}
		});
		return (
			<React.Fragment>
				<Surface
					style={styles.main}
					width={graphWidth}
					height={graphHeight}
				>
					<Group
						x={graphWidth - linesWidth - curveOffsetRight}
						y={linesHeight + curveOffsetBottom}
					>
						<XAxis
							xScale={this.xScale}
							dataPoints={dateArray}
							innerTick={xInnerTick}
							outerTick={xOuterTick}
							fontSize={xFontSize}
							strokeWidth={xStrokeWidth}
							curveOffsetTop={curveOffsetTop}
						/>
					</Group>
					<Group x={graphWidth - linesWidth - 5} y={curveOffsetTop}>
						<YAxis
							yScale={this.yScale}
							dataPoints={yAxisPoints}
							graphWidth={graphWidth}
							linesWidth={linesWidth}
							innerTick={yInnerTick}
							outerTick={yOuterTick}
							fontSize={yFontSize}
							strokeWidth={yStrokeWidth}
							curveOffsetRight={curveOffsetRight}
						/>
					</Group>
					<Group x={graphWidth - linesWidth - curveOffsetRight} y={curveOffsetTop}>
						<Line
							height={linesHeight}
							width={linesWidth}
							xScale={this.xScale}
							yScale={this.yScale}
							data={data}
							duration={duration}
							strokeWidth={lineStrokeWidth}
						/>
					</Group>
				</Surface>
			</React.Fragment>
		);
	}
}

LineChart.propTypes = {
	duration: PropTypes.number.isRequired,
	lineStrokeWidth: PropTypes.number.isRequired,
	xStrokeWidth: PropTypes.number.isRequired,
	yStrokeWidth: PropTypes.number.isRequired,
	linesHeight: PropTypes.number.isRequired,
	linesWidth: PropTypes.number.isRequired,
	graphHeight: PropTypes.number.isRequired,
	graphWidth: PropTypes.number.isRequired,
	curveOffsetTop: PropTypes.number.isRequired,
	curveOffsetBottom: PropTypes.number.isRequired,
	curveOffsetRight: PropTypes.number.isRequired,
	xTickDist: PropTypes.number.isRequired,
	yTickDist: PropTypes.number.isRequired,
	xInnerTick: PropTypes.number.isRequired,
	xOuterTick: PropTypes.number.isRequired,
	yInnerTick: PropTypes.number.isRequired,
	yOuterTick: PropTypes.number.isRequired,
	xFontSize: PropTypes.number.isRequired,
	yFontSize: PropTypes.number.isRequired,
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
	lineStrokeWidth: 1,
	xStrokeWidth: 0.5,
	yStrokeWidth: 0.5,
	linesHeight: 180,
	linesWidth: 220,
	graphHeight: 260,
	graphWidth: 280,
	duration: 2000,
	curveOffsetBottom: 10,
	curveOffsetTop: 20,
	curveOffsetRight: 10,
	xTickDist: 40,
	xInnerTick: 0,
	xOuterTick: 10,
	yTickDist: 40,
	yInnerTick: 0,
	yOuterTick: 7,
	xFontSize: 8,
	yFontSize: 8,
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff"
};

export { LineChart };
