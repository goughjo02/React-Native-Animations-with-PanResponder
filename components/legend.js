import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

class Legend extends React.Component {
	render() {
		var names = this.props.data.map(e => e.name);
		const { item1, item2, item3, color1, color2, color3 } = this.props;
		var styles = StyleSheet.create({
			bordered: {
				borderWidth: 3,
				borderStyle: "solid"
			},
			color1border: {
				borderColor: color1
			},
			color2border: {
				borderColor: color2
			},
			color3border: {
				borderColor: color3
			},
			spot: {
				height: 16,
				width: 16,
				margin: 4
			},
			color1spot: {
				backgroundColor: color1
			},
			color2spot: {
				backgroundColor: color2
			},
			color3spot: {
				backgroundColor: color3
			},
			row: {
				flexDirection: "row",
				alignItems: "center"
			},
			column: {
				flexDirection: "column"
			}
		});
		return (
			<View>
				<View style={[styles.row]}>
					<View style={[styles.color1spot, styles.spot]} />
					<Text>{names[0]}</Text>
					<Text>{Math.round(item1)}</Text>
				</View>
				<View style={[styles.row]}>
					<View style={[styles.color2spot, styles.spot]} />
					<Text>{names[1]}</Text>
					<Text>{Math.round(item2)}</Text>
				</View>
				<View style={[styles.row, styles.color3]}>
					<View style={[styles.color3spot, styles.spot]} />
					<Text>{names[2]}</Text>
					<Text>{Math.round(item3)}</Text>
				</View>
			</View>
		);
	}
}

const AnimatedLegend = Animated.createAnimatedComponent(Legend);

class AnimLegend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item1: new Animated.Value(0),
			item2: new Animated.Value(0),
			item3: new Animated.Value(0)
		};
	}
	componentDidMount() {
		this.animateFill();
	}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.animateFill();
		} else {
			return;
		}
	}
	animateFill = () => {
		var { duration } = this.props;
		var data = this.props.data.map(e => e.value);
		Animated.parallel([
			Animated.timing(this.state.item1, {
				toValue: data[0],
				duration: duration
			}),
			Animated.timing(this.state.item2, {
				toValue: data[1],
				duration: duration
			}),
			Animated.timing(this.state.item3, {
				toValue: data[2],
				duration: duration
			})
		]).start();
	};
	render() {
		const { ...other } = this.props;
		const { item1, item2, item3 } = this.state;
		return (
			<AnimatedLegend
				{...other}
				item1={item1}
				item2={item2}
				item3={item3}
			/>
		);
	}
}

AnimLegend.propTypes = {
	color1: PropTypes.string.isRequired,
	color2: PropTypes.string.isRequired,
	color3: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			value: PropTypes.number.isRequired
		})
	),
	duration: PropTypes.number
};

AnimLegend.defaultProps = {
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff",
	duration: 1000
};

export { AnimLegend as Legend };
