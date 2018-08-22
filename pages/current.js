import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	AnimatedGaugeProgress,
	GaugeProgress
} from "react-native-simple-gauge";

export class Current extends React.Component {
	render() {
		const size = 110;
		const width = 10;
		const cropDegree = 90;
		const textOffset = width;
		const textWidth = size - textOffset * 2;
		const textHeight = size * (1 - cropDegree / 360) - textOffset * 2;
		const styles = StyleSheet.create({
			bordered: {
				borderStyle: "solid",
				borderWidth: 1,
				borderColor: "#000"
			},
			main: {
				flex: 1,
				justifyContent: "space-around"
			},
			batteryStatus: {
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
				padding: 20
			},
			batteryTitle: {
				fontSize: 16
			},
			textView: {
				position: "absolute",
				top: textOffset + 10,
				left: textOffset,
				width: textWidth,
				height: textHeight,
				alignItems: "center",
				justifyContent: "center"
			},
			bigText: {
				fontSize: 28
			},
			figures: {}
		});
		return (
			<View style={[styles.bordered, styles.main]}>
				<View style={[styles.batteryStatus]}>
					<Text style={styles.batteryTitle}>Battery Volume</Text>
					<AnimatedGaugeProgress
						size={size}
						width={width}
						fill={64}
						rotation={90}
						cropDegree={cropDegree}
						tintColor="#4682b4"
						delay={100}
						backgroundColor="#b0c4de"
						stroke={[2, 2]}
						strokeCap="circle"
					>
						<View style={styles.textView}>
							<Text style={styles.bigText}>64%</Text>
						</View>
					</AnimatedGaugeProgress>
				</View>
				<View style={[styles.batteryStatus]}>
					<AnimatedGaugeProgress
						size={size}
						width={width}
						fill={77}
						rotation={90}
						cropDegree={cropDegree}
						tintColor="#4d4189"
						delay={100}
						backgroundColor="#b0c4de"
						stroke={[2, 2]}
						strokeCap="circle"
					>
						<View style={styles.textView}>
							<Text style={styles.bigText}>77%</Text>
						</View>
					</AnimatedGaugeProgress>
					<Text style={styles.batteryTitle}>Panel Capacity</Text>
				</View>
			</View>
		);
	}
}
