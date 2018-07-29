import React from "react";
import { ART, LayoutAnimation, StyleSheet } from "react-native";
const { Group, Shape, Surface } = ART;
import Morph from "art/morph/path";
import * as shape from "d3-shape";
import * as scale from "d3-scale";
const d3 = { scale, shape };
import PropTypes from "prop-types";
import { getMinMax } from "../services";

export class AnimShape extends React.Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			path: ""
		};
	}
	componentWillMount() {
		this.computeNextState(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.computeNextState(nextProps);
	}
	computeNextState(nextProps) {
		const { d } = nextProps;
		const { duration } = this.props;
		const graph = this.props.d();
		this.setState({
			path: graph.path
		});
		if (!this.previousGraph) {
			this.previousGraph = graph;
		}
		if (this.props !== nextProps) {
			const pathFrom = this.previousGraph.path;
			const pathTo = graph.path;
			cancelAnimationFrame(this.animating);
			this.animating = null;
			LayoutAnimation.configureNext(
				LayoutAnimation.create(
					duration,
					LayoutAnimation.Types.easeInEaseOut,
					LayoutAnimation.Properties.opacity
				)
			);
			this.setState(
				{
					path: Morph.Tween(pathFrom, pathTo)
				},
				() => {
					this.animate();
				}
			);
			this.previousGraph = graph;
		}
	}
	animate(start) {
		const { duration } = this.props;
		this.animating = requestAnimationFrame(timestamp => {
			if (!start) {
				start = timestamp;
			}
			const delta = (timestamp - start) / duration;
			if (delta > 1) {
				this.animating = null;
				this.setState({
					path: this.previousGraph.path
				});
				return;
			}
			this.state.path.tween(delta);
			this.setState(this.state, () => {
				this.animate(start);
			});
		});
	}
	render() {
		const path = this.state.path;
		const { color } = this.props;
		return <Shape d={path} strokeWidth={3} stroke={color} />;
	}
}

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
			.curve(d3.shape.curveNatural);
		return { path: lineShape(data) };
	};
	render() {
		const { height, width, color1, color2, color3 } = this.props;
		var { ...other } = this.props;
		const styles = StyleSheet.create({
			surface: {
				backgroundColor: "white"
			}
		});
		return (
			<Surface
				style={styles.surface}
				width={width + 40}
				height={height + 40}
			>
				<Group x={20} y={20}>
					<AnimShape
						{...other}
						color={color1}
						d={() => this._createLine("produced")}
					/>
					<AnimShape
						{...other}
						color={color2}
						d={() => this._createLine("used")}
					/>
					<AnimShape
						{...other}
						color={color3}
						d={() => this._createLine("sold")}
					/>
				</Group>
			</Surface>
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
	color1: "#ff0000",
	color2: "#00ff00",
	color3: "#0000ff"
};

export { AnimLine as Line };
