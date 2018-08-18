import React from "react";
import { ART, LayoutAnimation } from "react-native";
const { Shape } = ART;
import Morph from "art/morph/path";

export class AnimShape extends React.Component {
	constructor(props: Props) {
		super(props);
		this.state = {
			path: "",
			mounted: false
		};
	}
	componentWillMount() {
		this.computeNextState(this.props);
	}
	componentDidMount() {
		this.setState({ mounted: true });
	}
	componentWillUnmount() {
		this.setState({ mounted: false });
	}
	componentWillReceiveProps(nextProps) {
		this.computeNextState(nextProps);
	}
	computeNextState(nextProps) {
		const { d } = nextProps;
		const { duration } = this.props;
		let { mounted } = this.state;
		const graph = this.props.d();
		this.setState({
			path: graph.path
		});
		if (!this.previousGraph) {
			this.previousGraph = graph;
		}
		if (this.props !== nextProps && mounted) {
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
			if (mounted) {
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
	}
	animate(start) {
		const { duration } = this.props;
		let { mounted } = this.state;
		this.animating = requestAnimationFrame(timestamp => {
			if (!start) {
				start = timestamp;
			}
			const delta = (timestamp - start) / duration;
			if (delta > 1 && mounted) {
				this.animating = null;
				this.setState({
					path: this.previousGraph.path
				});
				return;
			}
			this.state.path.tween(delta);
			if (mounted) {
				this.setState(this.state, () => {
					let { mounted } = this.state;
					if (mounted) {
						this.animate(start);
					}
				});
			}
		});
	}
	render() {
		const path = this.state.path;
		const { color, strokeWidth } = this.props;
		return <Shape d={path} strokeWidth={strokeWidth} stroke={color} />;
	}
}
