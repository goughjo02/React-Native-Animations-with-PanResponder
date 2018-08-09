import React from "react";
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
			xScale,
			yScale,
			data,
			duration,
			xTickDist,
			yTickDist
		} = this.props;
		this.getScales(graphHeight, graphWidth, data);
		var timedata = data.map(e => e.date);
		var xAxisPoints = get_x_axes_points(xTickDist, graphWidth, timedata);
		var dateArray = [];
		xAxisPoints.forEach(e => {
			dateArray.push(new Date(e));
		});
		return (
			<React.Fragment>
				<Line
					height={graphHeight}
					width={graphWidth}
					xScale={this.xScale}
					yScale={this.yScale}
					data={data}
					duration={duration}
				/>
				<XAxis xScale={this.xScale} yScale={this.yScale} dataPoints={dateArray} />
			</React.Fragment>
		);
	}
}

LineChart.propTypes = {
	duration: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	graphHeight: PropTypes.number.isRequired,
	graphWidth: PropTypes.number.isRequired,
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
	height: 200,
	width: 300,
	graphHeight: 170,
	graphWidth: 260,
	duration: 2000,
	xTickDist: 40,
	yTickDist: 40,
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff"
};

export { LineChart };
