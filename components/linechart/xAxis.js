import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Path, Shape, Surface, Text } = ART;
import { PropTypes } from "prop-types";

import { AnimShape } from "./anim_shape";

class XAxis extends React.Component {
	constructor(props) {
		super(props);
		this.points = [];
	}
	getPath = () => {
		var { width } = this.props;
		var path = "";
		for (var i = 0; i <= this.points.length - 1; i++) {
			path = path + `H${this.points[i]}`;
			path = path + "v15";
			path = path + "v-15";
		}
		path = path + `H${this.props.width}`
		return {path: path} ;
	};
	getLabels = () => {
		var { dataPoints } = this.props;
		for (var i = 0; i <= dataPoints.length - 1; i++) {
			return (
				<Text
					y={30}
					x={this.points[i]}
					font={`10px "Helvetica Neue", "Helvetica", Arial`}
					fill="#000000"
					alignment="center"
				>
					... {dataPoints[i]}
				</Text>
			);
		}
	};
	scalePoints = () => {
		var { xScale, yScale, dataPoints } = this.props;
		this.points = [];
		for (var i = 0; i <= dataPoints.length - 1; i++) {
			this.points.push(xScale(dataPoints[i]));
		}
	};
	render() {
		var { height, width, color, strokeWidth } = this.props;
		this.scalePoints();
		var { ...other } = this.props;
		return (
			<AnimShape
				{...other}
				d={() => this.getPath()}
				fill={color}
				stroke="#000"
				strokeWidth={strokeWidth}
			/>
		);
	}
}

XAxis.propTypes = {
	xScale: PropTypes.func.isRequired,
	yScale: PropTypes.func.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	dataPoints: PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired)
		.isRequired
};
XAxis.defaultProps = {
	height: 30,
	width: 300,
	duration: 2000,
	color: "#000",
	strokeWidth: 2
};

export { XAxis };
