import React from "react";
import { ART } from "react-native";
import PropTypes from "prop-types";
const { Shape, Group, Surface } = ART;

class Logo extends React.Component {
	constructor(props) {
		super(props);
	}
	line = ([x1, y1, x2, y2, x3, y3, x4, y4]) => {
		const { height, width } = this.props;
		const viewportHeight = 1967.606;
		const viewportWidth = 1811.638;
		var X1 = (width * x1) / viewportWidth;
		var X2 = (width * x2) / viewportWidth;
		var X3 = (width * x3) / viewportWidth;
		var X4 = (width * x4) / viewportWidth;
		var Y1 = (width * y1) / viewportWidth;
		var Y2 = (width * y2) / viewportWidth;
		var Y3 = (width * y3) / viewportWidth;
		var Y4 = (width * y4) / viewportWidth;
		let path = `M${X1},${Y1} L${X2},${Y2} L${X3},${Y3} L${X4},${Y4} Z`;
		return path;
	};
	render() {
		var { height, width, strokeWidth, color } = this.props;
		var line1 = [
			1423.725,
			1513.048,
			116.255,
			901.181,
			910.237,
			107.198,
			1704.22,
			901.181
		];
		var line2 = [
			1423.725,
			1634.467,
			116.255,
			1022.572,
			910.237,
			228.604,
			1704.22,
			1022.572
		];
		var line3 = [
			1423.725,
			1755.859,
			116.255,
			1143.991,
			910.237,
			349.981,
			1704.22,
			1143.991
		];
		var line4 = [
			1423.725,
			1877.264,
			116.255,
			1265.382,
			910.237,
			471.4,
			1704.22,
			1265.382
		];
		return (
			<Surface width={width} height={height + 4}>
				<Group x={0} y={0}>
					<Shape
						d={this.line(line1)}
						strokeWidth={strokeWidth}
						stroke={color}
					/>
					<Shape
						d={this.line(line2)}
						strokeWidth={strokeWidth}
						stroke={color}
					/>
					<Shape
						d={this.line(line3)}
						strokeWidth={strokeWidth}
						stroke={color}
					/>
					<Shape
						d={this.line(line4)}
						strokeWidth={strokeWidth}
						stroke={color}
					/>
				</Group>
			</Surface>
		);
	}
}

Logo.propTypes = {
	height: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired
};

Logo.defaultProps = {
	height: 100,
	width: 100,
	strokeWidth: 3,
	color: "000"
};

export { Logo };
