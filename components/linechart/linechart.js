import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Path, Shape, Surface, Text } = ART;
import PropTypes from "prop-types";

import { Box } from "./box";
import { Lines } from "./lines";
import { PrimaryFrame } from "./primaryFrame";
import { SecondaryFrame } from "./secondaryFrame";
import { XAxis } from "./xAxis";
import { YAxis } from "./yAxis";

class LineChart extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var {
			backgroundColor,
			lineStrokeWidth,
			graphWidth,
			graphHeight,
			xScale,
			yScale,
			data,
			duration,
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
						fontSize={yFontSize}
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
	animated: PropTypes.boolean.isRequired,
	duration: PropTypes.number.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			bought: PropTypes.number.isRequired,
			date: PropTypes.instanceOf(Date).isRequired,
			produced: PropTypes.number.isRequired,
			sold: PropTypes.number.isRequired,
			used: PropTypes.number.isRequired
		})
	),
	scale: PropTypes.function.isRequired,
	xKey: PropTypes.arrayOf(PropTypes.string.isRequired),
	yKey: PropTypes.arrayOf(PropTypes.string.isRequired),
	xAxisPoints: PropTypes.arrayOf(PropTypes.number.isRequired)
};
LineChart.defaultProps = {
	animated: true,
	duration: 2000
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
		xScale: state.scale.xScale,
		yScale: state.scale.yScale
	};
};

const ConnectedPage = connect(mapStateToProps)(LineChart);

export { ConnectedPage as LineChart };
