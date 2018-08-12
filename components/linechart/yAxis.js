import React from "react";
import { ART } from "react-native";
const { Shape, Text } = ART;
import { PropTypes } from "prop-types";

import { AnimShape } from "./anim_shape";

class YAxis extends React.Component {
	constructor(props) {
		super(props);
		this.points = [];
	}
	getPath = () => {
		var { width, outerTick, innerTick } = this.props;
		var path = "";
		for (var i = 0; i <= this.points.length - 1; i++) {
			path = path + `V${this.points[i]}, 0`;
			path = path + `h${outerTick}`;
			path = path + `h-${outerTick}`;
			path = path + `h-${innerTick}`;
			path = path + `h${innerTick}`;
		}
		path = path + `V${this.props.height}`
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
		var { yScale, dataPoints } = this.props;
		this.points = [];
		for (var i = 0; i <= dataPoints.length - 1; i++) {
			this.points.push(yScale(dataPoints[i]));
		}
	};
	render() {
		var { height, width, color, strokeWidth, strokeJoin } = this.props;
		this.scalePoints();
		var { ...other } = this.props;
		return (
			<Shape
				{...other}
				d={"V100"}
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
	dataPoints: PropTypes.arrayOf(PropTypes.instanceOf(Date).isRequired)
		.isRequired
};
YAxis.defaultProps = {
	height: 240,
	width: 30,
	outerTick: 15,
	innerTick: 300,
	duration: 2000,
	color: 'rgba(0, 0, 0, 0.5)',
	strokeWidth: 1,
	strokeJoin: "round"
};

export { YAxis };
