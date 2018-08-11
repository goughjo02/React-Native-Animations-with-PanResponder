import React from "react";
import { ART } from "react-native";
const { Text } = ART;
import { PropTypes } from "prop-types";

import { AnimShape } from "./anim_shape";

class XAxis extends React.Component {
	constructor(props) {
		super(props);
		this.points = [];
	}
	getPath = () => {
		var { width, outerTick, innerTick } = this.props;
		var path = "";
		for (var i = 0; i <= this.points.length - 1; i++) {
			path = path + `H${this.points[i]}`;
			path = path + `v${outerTick}`;
			path = path + `v-${outerTick}`;
			path = path + `v-${innerTick}`;
			path = path + `v${innerTick}`;
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
		var { height, width, color, strokeWidth, strokeJoin } = this.props;
		this.scalePoints();
		var { ...other } = this.props;
		return (
			<AnimShape
				{...other}
				d={() => this.getPath()}
				fill={color}
				stroke="#000"
				strokeWidth={strokeWidth}
				strokeJoin={strokeJoin}
			/>
		);
	}
}

XAxis.propTypes = {
	xScale: PropTypes.func.isRequired,
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
XAxis.defaultProps = {
	height: 30,
	width: 300,
	outerTick: 15,
	innerTick: 0,
	duration: 2000,
	color: 'rgba(0, 0, 0, 0.5)',
	strokeWidth: 1,
	strokeJoin: "round"
};

export { XAxis };
