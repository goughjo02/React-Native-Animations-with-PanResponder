import React from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { Legend, LineChart, RadialChart, ZoomSlider } from "../../components";
import { fetchData } from "../../services";
import { DataApi } from '../../config';
import { Styles } from './styles';


class History extends React.Component {
	static navigationOptions = {
		// Hide the header (react-navigation)
		header: null
	};
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		// Get time series data from API
		this.props.dispatch(fetchData(DataApi.timeSeries()));
	}
	render() {
		var duration = 2000;
		// Check if there is data and what is the screen orientation.
		var { color, data, portrait, screen } = this.props;
		const dynamicStyles = StyleSheet.create({
			fullWidth: {
				width: screen.width
			}
		})
		// Is there data?
		if (data > 0) {
			// Are we in Portrait mode?
			if (portrait) {
				return (
					<React.Fragment>
						<View style={[Styles.spaceAround]}>
							<View style={[Styles.justifyCenter, Styles.flexRow]}>
								<RadialChart
									duration={duration}
									radius={45}
									strokeWidth={4}
									offsetFactor={2.5}
									maxAngle={360}
								/>
								<Legend duration={duration} />
							</View>
							<View style={[Styles.justifyCenter, styles.alignCenter]}>
								<LineChart
									duration={duration}
									backgroundColor={color.chart.margins}
									chartColor={color.chart.background}
									primaryFrameColor={color.chart.primaryFrame}
									secondaryFrameColor={color.chart.secondaryChart}
									graphHeight={190}
									graphWidth={screen.width - 40}
									marginTop={20}
									marginBottom={40}
									marginLeft={40}
									marginRight={20}
									paddingTop={0}
									paddingBottom={0}
									paddingLeft={0}
									paddingRight={0}
									lineStrokeWidth={1.2}
								/>
							</View>
							<View style={[Styles.justifyCenter, styles.alignCenter]}>
								<ZoomSlider
										buttonWidth={30}
										buttonsHeight={80}
										buttonRadius={40}
										holderWidth={300}
										margin={8}
										backgroundColor={color.slider.bar}
										color={color.slider.button}
								/>
							</View>
						</View>
					</React.Fragment>
				);
			} else {
				return (
					<React.Fragment>
						<View style={[Styles.spaceAround]}>
							<View style={[Styles.justifyCenter, styles.alignCenter]}>
								<LineChart
									duration={duration}
									backgroundColor={color.chart.margins}
									chartColor={color.chart.background}
									primaryFrameColor={color.chart.primaryFrame}
									secondaryFrameColor={color.chart.secondaryChart}
									graphHeight={190}
									graphWidth={screen.width - 40}
									marginTop={20}
									marginBottom={40}
									marginLeft={40}
									marginRight={20}
									paddingTop={0}
									paddingBottom={0}
									paddingLeft={0}
									paddingRight={0}
									lineStrokeWidth={1.2}
								/>
							</View>
							<View style={[Styles.spaceAround]}>
								<RadialChart
									duration={duration}
									radius={45}
									strokeWidth={4}
									offsetFactor={2.5}
									maxAngle={360}
								/>
								<Legend duration={duration} />
								<View style={[Styles.justifyCenter, styles.alignCenter]}>
									<ZoomSlider
										buttonWidth={30}
										buttonsHeight={80}
										buttonRadius={40}
										holderWidth={300}
										margin={8}
										backgroundColor={color.slider.bar}
										color={color.slider.button}
									/>
								</View>
							</View>
						</View>
					</React.Fragment>
				);
			}
		}
		return <Text>No data present</Text>;
	}
}

const mapStateToProps = state => {
	return {
		//Only render charts if data is present
		data: state.data.length,
		//Get colors
		color: state.color,
		//Get screen state
		screen: state.screen
	};
};

const ConnectedPage = connect(mapStateToProps)(History);

export { ConnectedPage as History };
