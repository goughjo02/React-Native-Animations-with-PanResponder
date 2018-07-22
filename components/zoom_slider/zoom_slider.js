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
import PropTypes from 'prop-types';
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
		var { start, end } = this.props.zoom;
		this.state.trans1.setOffset(
			percentage_to_translation(start_slice_to_percentage(start))
		);
		this.state.trans2.setOffset(
			percentage_to_translation(end_slice_to_percentage(end))
		);
		this.state.trans1.flattenOffset();
		this.state.trans2.flattenOffset();
		this.state.pan1.x.setOffset(this.state.trans1.__getValue());
		this.state.pan2.x.setOffset(this.state.trans2.__getValue());
	};
	setTrans1State = start => {
		var begin = translate_to_percentage(start_percentage_to_slice(start));
		this.props.setStartZoom(begin);
	};
	setTrans2State = end => {
		var finish = translate_to_percentage(start_percentage_to_slice(end));
		this.props.setEndZoom(finish);
	};
	_panResponder1 = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
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
		debounce(() => {
			this.setTrans1State(this.state.trans1);
			this.setTrans2State(this.state.trans2);
		})();
	};
	render() {
		let { trans1, trans2 } = this.state;
		var { buttonWidth, buttonsHeight, margin, holderWidth } = this.props;
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
				backgroundColor: this.props.colorsScheme.mid
			},
			middleBar: {
				height: 5,
				width: holderWidth,
				backgroundColor: this.props.colorsScheme.outer,
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
	holderWidth: PropTypes.number.isRequired,
	margin: PropTypes.number.isRequired,
	zoom: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired
    })
}
ZoomSlider.defaultProps = {
	buttonWidth: 30,
	buttonsHeight: 80,
	holderWidth: Dimensions.get("window").width - 80,
	margin: 8
}
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
