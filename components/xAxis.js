import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Path, Shape, Surface } = ART;
import {PropTypes } from 'prop-types';

class XAxis extends React.Component {
	constructor(props) {
		super(props);
		this.points = [];
	}
	getPaths = () => {
		var { width } = this.props;
		var path = new Path();
		for (var i = this.points.length - 1; i >= 0; i--) {
			path.lineTo(this.points[i], 0);
			path.line(0, 15);
			path.line(0, - 15);
		}
		path.lineTo(this.props.width, 0);
		path.close();
		return path;
	};
	scalePoints = () => {
		var { xScale, yScale, dataPoints } = this.props;
		this.points = [];
		for (var i = dataPoints.length - 1; i >= 0; i--) {
			this.points.push(xScale(dataPoints[i]));
		}
	}
	render() {
		var { height, width, color, strokeWidth } = this.props;
		const styles = StyleSheet.create({
			main: {
				borderStyle: "solid",
				borderColor: color,
				borderWidth: 3
			}
		});
		this.scalePoints();
		return (
			<Surface style={styles.main} width={width} height={height}>
				<Group x={0} y={0}>
					<Shape
						d={this.getPaths()}
						fill={color}
						stroke="#000"
						strokeWidth={strokeWidth}
					/>
				</Group>
			</Surface>
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
	dataPoints: PropTypes.arrayOf(
		PropTypes.instanceOf(Date).isRequired,
	).isRequired
}
XAxis.defaultProps = {
	height: 30,
	width: 300,
	duration: 2000,
	color: "#000",
	strokeWidth: 2
};

export { XAxis };
