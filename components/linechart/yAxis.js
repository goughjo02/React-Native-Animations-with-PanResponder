import React from "react";
import { ART } from "react-native";
const { Shape, Text } = ART;
import { PropTypes } from "prop-types";


class YAxis extends React.Component {
	constructor(props) {
		super(props);
		this.points = [];
	}
	scalePoints = () => {
		var { yScale, dataPoints } = this.props;
		for (var i = 0; i <= dataPoints.length - 1; i++) {
			this.points.push(yScale(dataPoints[i]))
		}
	};
	getPath = () => {
		var { outerTick, innerTick } = this.props;
		var path = "";
		for (var i = 0; i <= this.points.length - 1; i++) {
			path = path + `V${this.points[i]}`;
			path = path + `h-${outerTick}`;
			path = path + `h${outerTick}`;
			path = path + `h${innerTick}`;
			path = path + `h-${innerTick}`;
		}
		return {path: path} ;
	};
	getLabels = () => {
		for (var i = this.points.length - 1; i >= 0; i--) {
			return (
				<Text
					y={30}
					x={this.points[i]}
					font={`10px "Helvetica Neue", "Helvetica", Arial`}
					fill="#000000"
					alignment="center"
				>
					... {this.points[i]}
				</Text>
			);
		}
	};
	render() {
		var { color, strokeWidth, strokeJoin } = this.props;
		this.scalePoints();
		var { ...other } = this.props;
		return (
			<Shape
				{...other}
				d={this.getPath().path}
				fill={color}
				stroke="#000"
				strokeWidth={strokeWidth}
				strokeJoin={strokeJoin}
			/>
		);
	}
}

YAxis.propTypes = {
	yScale: PropTypes.func.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	outerTick: PropTypes.number.isRequired,
	innerTick: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	strokeJoin: PropTypes.string.isRequired,
	dataPoints: PropTypes.arrayOf(PropTypes.number.isRequired)
		.isRequired
};
YAxis.defaultProps = {
	height: 240,
	width: 30,
	outerTick: 15,
	innerTick: 0,
	duration: 2000,
	color: 'rgba(0, 0, 0, 0.5)',
	strokeWidth: 1,
	strokeJoin: "round"
};

export { YAxis };
