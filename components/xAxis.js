import React from "react";
import { ART, StyleSheet } from "react-native";
const { Group, Path, Shape, Surface } = ART;
import {PropTypes } from 'prop-types';

class XAxis extends React.Component {
	constructor(props) {
		super(props);
	}
	getPaths = () => {
		return new Path().line(20, 0).line(0, 15).line(0, - 15).line(20, 0).close();
	};
	render() {
		var { height, width, color, strokeWidth } = this.props;
		const styles = StyleSheet.create({
			main: {
				borderStyle: "solid",
				borderColor: color,
				borderWidth: 3
			}
		});
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
