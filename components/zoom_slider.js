import React from "react";
import {
	Animated,
	Dimensions,
	PanResponder,
	StyleSheet,
	Text,
	View
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { debounce, throttle } from "lodash";

import {
	translate_to_percentage,
	percentage_to_translation,
	start_percentage_to_slice,
	end_percentage_to_slice,
	start_slice_to_percentage,
	end_slice_to_percentage
} from "../../services";
import { setStartZoom, setEndZoom } from "../../redux";

class ZoomSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pan1: new Animated.ValueXY(),
			pan2: new Animated.ValueXY(),
			trans1: new Animated.Value(0),
			trans2: new Animated.Value(0)
		};
		this.getTransState();
	}
	getTransState = () => {
		var { buttonWidth, dataLength, holderWidth } = this.props;
		var { start, end } = this.props.zoom;
		var translationStart = percentage_to_translation(
			holderWidth,
			buttonWidth,
			start
		);
		var translationEnd = percentage_to_translation(
			holderWidth,
			buttonWidth,
			end
		);
		this.state.trans1.setOffset(translationStart);
		this.state.trans2.setOffset(translationEnd);
		this.state.trans1.flattenOffset();
		this.state.trans2.flattenOffset();
		this.state.pan1.x.setOffset(this.state.trans1.__getValue());
		this.state.pan2.x.setOffset(this.state.trans2.__getValue());
		this.state.pan1.x.flattenOffset();
		this.state.pan2.x.flattenOffset();
	};
	setTrans1State = start => {
		var { buttonWidth, dataLength, holderWidth } = this.props;
		var percent = translate_to_percentage(
			holderWidth,
			buttonWidth,
			start.__getValue()
		);
		this.props.setStartZoom(percent);
	};
	setTrans2State = end => {
		var { buttonWidth, dataLength, holderWidth } = this.props;
		var percent = translate_to_percentage(
			holderWidth,
			buttonWidth,
			end.__getValue()
		);
		this.props.setEndZoom(percent);
	};
	_panResponder1 = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onResponderTerminationRequest: evt => false,
		onPanResponderGrant: (e, gestureState) => {
			this.state.pan1.x.setOffset(this.state.trans1.__getValue());
			this.setState({ isAddNewSession: true });
		},
		onPanResponderMove: (evt, gestureState) => {
			return Animated.event(
				[
					null,
					{
						dx: this.state.pan1.x
					}
				],
				{
					listener: this.onMove
				}
			)(evt, gestureState);
		},
		onPanResponderRelease: (e, gesture) => {
			this.setState({ isAddNewSessionModal: true });
			this.setState({ isAddNewSession: false });
			this.state.pan1.flattenOffset();
			this.setTrans1State(this.state.trans1);
		}
	});
	_panResponder2 = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onResponderTerminationRequest: evt => false,
		onPanResponderGrant: (e, gestureState) => {
			this.state.pan2.x.setOffset(this.state.trans2.__getValue());
			this.setState({ isAddNewSession: true });
		},
		onPanResponderMove: (evt, gestureState) => {
			return Animated.event(
				[
					null,
					{
						dx: this.state.pan2.x
					}
				],
				{
					listener: this.onMove
				}
			)(evt, gestureState);
		},
		onPanResponderRelease: (e, gesture) => {
			this.setState({ isAddNewSessionModal: true });
			this.setState({ isAddNewSession: false });
			this.state.pan2.flattenOffset();
			this.setTrans2State(this.state.trans2);
		}
	});
	onMove = () => {
		var { trans1, trans2 } = this.state;
		var { buttonWidth, buttonsHeight, margin, holderWidth } = this.props;
		this.setState({
			trans1: this.state.pan1.x.interpolate({
				inputRange: [0, trans2.__getValue() - buttonWidth],
				outputRange: [0, trans2.__getValue() - buttonWidth],
				extrapolateRight: "clamp",
				extrapolateLeft: "clamp"
			})
		});
		this.setState({
			trans2: this.state.pan2.x.interpolate({
				inputRange: [
					trans1.__getValue() + buttonWidth,
					holderWidth - buttonWidth
				],
				outputRange: [
					trans1.__getValue() + buttonWidth,
					holderWidth - buttonWidth
				],
				extrapolateRight: "clamp",
				extrapolateLeft: "clamp"
			})
		});
		// debounce(() => {
		// 	this.setTrans1State(this.state.trans1);
		// 	this.setTrans2State(this.state.trans2);
		// })();
	};
	render() {
		let { trans1, trans2 } = this.state;
		var {
			color,
			backgroundColor,
			buttonWidth,
			buttonsHeight,
			margin,
			holderWidth
		} = this.props;
		const styles = StyleSheet.create({
			pan1: {
				transform: [{ translateX: trans1 }]
			},
			pan2: {
				transform: [{ translateX: trans2 }]
			},
			slider: {
				position: "absolute",
				height: buttonWidth,
				width: buttonWidth,
				borderRadius: buttonWidth / 2,
				backgroundColor: color
			},
			middleBar: {
				height: 5,
				width: holderWidth,
				backgroundColor: backgroundColor,
				position: "absolute",
				top: buttonWidth / 2 - 2.5
			},
			sliderRow: {
				height: buttonWidth + 2,
				width: holderWidth,
				flexDirection: "row",
				justifyContent: "space-between",
				marginTop: margin,
				marginBottom: margin,
				marginLeft: margin,
				marginRight: margin
			}
		});
		return (
			<View style={styles.sliderRow}>
				<View style={styles.middleBar} />
				<Animated.View
					hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
					style={[styles.pan1, styles.slider]}
					{...this._panResponder1.panHandlers}
				/>
				<Animated.View
					hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
					style={[styles.pan2, styles.slider]}
					{...this._panResponder2.panHandlers}
				/>
			</View>
		);
	}
}

ZoomSlider.propTypes = {
	buttonWidth: PropTypes.number.isRequired,
	buttonsHeight: PropTypes.number.isRequired,
	dataLength: PropTypes.number.isRequired,
	holderWidth: PropTypes.number.isRequired,
	margin: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	zoom: PropTypes.shape({
		start: PropTypes.number.isRequired,
		end: PropTypes.number.isRequired
	})
};
ZoomSlider.defaultProps = {
	buttonWidth: 30,
	buttonsHeight: 80,
	holderWidth: Dimensions.get("window").width - 80,
	margin: 8,
	color: "#ff0000",
	backgroundColor: "#00ff00"
};
const mapStateToProps = state => {
	return {
		zoom: state.zoom
	};
};

const ConnectedZoomSlider = connect(
	mapStateToProps,
	{ setStartZoom, setEndZoom }
)(ZoomSlider);

export { ConnectedZoomSlider as ZoomSlider };
