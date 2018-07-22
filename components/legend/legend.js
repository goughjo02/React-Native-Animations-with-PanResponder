import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

class Legend extends React.Component {
	render() {
		var names = this.props.data.map(e => e.name);
		const { item1, item2, item3, color1, color2, color3 } = this.props;
		var styles = StyleSheet.create({
			color1: {
				borderColor: color1,
				borderWidth: 3,
				borderStyle: "solid"
			},
			color2: {
				borderColor: color2,
				borderWidth: 3,
				borderStyle: "solid"
			},
			color3: {
				borderColor: color3,
				borderWidth: 3,
				borderStyle: "solid"
			},
			row: {
				flexDirection: "row"
			},
			column: {
				flexDirection: "column"
			}
		})
		return (
			<View>
				<View style={[styles.row, styles.color1]}>
					<Text>{names[0]}</Text>
					<Text>{Math.round(item1)}</Text>
				</View>
				<View style={[styles.row, styles.color2]}>
					<Text>{names[1]}</Text>
					<Text>{Math.round(item2)}</Text>
				</View>
				<View style={[styles.row, styles.color3]}>
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
	duration: 2000
};

export { AnimLegend as Legend };
