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
import { Box, Lines, PrimaryFrame, SecondaryFrame, XAxis, YAxis } from "./";

class LineChart extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var {
			backgroundColor,
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
				backgroundColor: backgroundColor
			}
		});
		return (
			<React.Fragment>
				<Surface
					style={styles.main}
					width={graphWidth}
					height={graphHeight}
				>
					<Box
						x={marginLeft}
						y={marginTop}
						height={height - marginTop - marginBottom}
						width={width - marginLeft - marginRigt}
					/>
					<PrimaryFrame
						xPoints={xPointsPrimary}
						yPoints={yPointsPrimary}
						x={marginLeft}
						y={marginTop}
						height={height - marginTop - marginBottom}
						width={width - marginLeft - marginRigt}
					/>
					<SecondaryFrame
						xPoints={xPointsSecondary}
						yPoints={yPointsSecondary}
						x={marginLeft}
						y={marginTop}
						height={height - marginTop - marginBottom}
						width={width - marginLeft - marginRigt}
					/>
					<XAxis
						dataPoints={dateArray}
						fontSize={xFontSize}
						x={marginLeft}
						y={height - marginBottom}
					/>
					<YAxis
						dataPoints={dateArray}
						fontSize={xFontSize}
						x={marginLeft}
						y={height - marginBottom}
					/>
					<Group x={marginLeft + paddingLeft} y={MarginTop + paddingTop}>
						<Lines
							height={
								height -
								marginTop -
								marginBottom -
								paddingTop -
								paddingBottom
							}
							width={
								width -
								marginLeft -
								marginRight -
								paddingLeft -
								paddingRight
							}
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
	backgroundColor: PropTypes.string.isRequired,
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
	),
	minX: PropTypes.number.isRequired,
	maxX: PropTypes.number.isRequired,
	minY: PropTypes.number.isRequired,
	maxY: PropTypes.number.isRequired,
	scale: PropTypes.function.isRequired,
	xKey: PropTypes.arrayOf(PropTypes.string.isRequired),
	yKey: PropTypes.arrayOf(PropTypes.string.isRequired),
	xAxisPoints: PropTypes.arrayOf(PropTypes.number.isRequired)
};
LineChart.defaultProps = {
	animated: true,
	duration: 2000,
	xTick: 0,
	yTick: 0,
	xFontSize: 8,
	yFontSize: 8,
	xStrokeWidth: 0.8,
	yStrokeWidth: 0.8,
	backgroundColor: "#fff",
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff"
};

const mapStateToProps = state => {
	return {
		data: combination_selector(
			state.data.data,
			state.range.start,
			state.range.end,
			state.zoom.start,
			state.zoom.end
		),
		/////// TO DO
		minX: state.data.minX,
		maxX: state.data.maxX,
		minY: state.date.minY,
		maxY: state.data.maxY,
		scale: state.data.scale,
		xKey: state.data.xKey,
		yKey: state.data.yKey
	};
};

const ConnectedPage = connect(mapStateToProps)(LineChart);

export { ConnectedPage as LineChart };
