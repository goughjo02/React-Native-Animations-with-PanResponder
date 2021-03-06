import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Surface } = ART;
import * as shape from "d3-shape";
const d3 = { shape };
import PropTypes from "prop-types";

import { AnimShape } from "./anim_shape";

class AnimLine extends React.Component {
	constructor(props) {
		super(props);
	}
	_createLine = column => {
		var { data, xScale, yScale } = this.props;
		const lineShape = d3.shape
			.line()
			.x(d => xScale(d["date"]))
			.y(d => yScale(d[column]))
			.curve(d3.shape.curveMonotoneX);
		return { path: lineShape(data) };
	};
	render() {
		const { height, width, color1, color2, color3, strokeWidth } = this.props;
		var { ...other } = this.props;
		const styles = StyleSheet.create({
			surface: {
				backgroundColor: "white"
			}
		});
		return (
			<React.Fragment>
				<AnimShape
					{...other}
					color={color1}
					d={() => this._createLine("produced")}
					strokeWidth={strokeWidth}
				/>
				<AnimShape
					{...other}
					color={color2}
					d={() => this._createLine("used")}
					strokeWidth={strokeWidth}
				/>
				<AnimShape
					{...other}
					color={color3}
					d={() => this._createLine("sold")}
					strokeWidth={strokeWidth}
				/>
			</React.Fragment>
		);
	}
}

AnimLine.propTypes = {
	xScale: PropTypes.func.isRequired,
	yScale: PropTypes.func.isRequired,
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired,
	color1: PropTypes.string.isRequired,
	color2: PropTypes.string.isRequired,
	color3: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
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
AnimLine.defaultProps = {
	height: 170,
	width: 300,
	duration: 2000,
	strokeWidth: 3,
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff"
};

export { AnimLine as Line };
