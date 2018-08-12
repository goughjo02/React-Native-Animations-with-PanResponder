import React from "react";
import { Animated, ART, AppState, StyleSheet, View } from "react-native";
const { Surface, Shape, Path, Group } = ART;
import PropTypes from "prop-types";

class RadialChart extends React.Component {
  state = { appState: AppState.currentState };
  componentDidMount = () =>
    AppState.addEventListener("change", this.handleAppStateChange);
  componentWillUnmount = () =>
    AppState.removeEventListener("change", this.handleAppStateChange);
  handleAppStateChange = appState => this.setState({ appState });

  render() {
    var {
      innerPath,
      middlePath,
      outerPath,
      innerLength,
      middleLength,
      outerLength
    } = this.props;
    const {
      color1,
      color2,
      color3,
      radius,
      rotation,
      strokeWidth
    } = this.props;
    const styles = StyleSheet.create({
      circles: {
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center"
      }
    });
    return (
      <React.Fragment>
        <View style={styles.circles}>
          <Surface
            width={radius * 2}
            height={radius * 2}
            key={this.state.appState}
          >
            <Group rotation={rotation} originX={radius} originY={radius}>
              <Shape
                d={outerPath}
                stroke={color1}
                strokeDash={[outerLength, 2 * Math.PI * outerPath.path[1]]}
                strokeWidth={strokeWidth}
                strokeCap="round"
              />
              <Shape
                d={middlePath}
                stroke={color2}
                strokeDash={[middleLength, 2 * Math.PI * middlePath.path[1]]}
                strokeWidth={strokeWidth}
                strokeCap="round"
              />
              <Shape
                d={innerPath}
                stroke={color3}
                strokeDash={[innerLength, 2 * Math.PI * innerPath.path[1]]}
                strokeWidth={strokeWidth}
                strokeCap="round"
              />
            </Group>
          </Surface>
        </View>
      </React.Fragment>
    );
  }
}

const AnimatedRadialProgress = Animated.createAnimatedComponent(RadialChart);

class AnimRadialChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      innerStroke: new Animated.Value(0),
      middleStroke: new Animated.Value(0),
      outerStroke: new Animated.Value(0)
    };
  }

  circlePath = (cx, cy, r, startDegree, endDegree) => {
    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(
      4,
      cx,
      cy,
      r,
      (startDegree * Math.PI) / 180,
      (endDegree * 0.9999 * Math.PI) / 180,
      1
    );
    return p;
  };

  componentWillMount() {
    var { ...other } = this.props;
    var {
      maxAngle,
      offsetFactor,
      precent,
      radius,
      rotation,
      strokeWidth
    } = this.props;
    var offset = strokeWidth * offsetFactor;
    var { color1, color2, color3 } = this.props;
    var data = this.props.data.map(e => e.value);
    var max = Math.max(data[0], data[1], data[2]);
    var radiusInner = radius - strokeWidth / 2 - offset * 2;
    var radiusMiddle = radius - strokeWidth / 2 - offset;
    var radiusOuter = radius - strokeWidth / 2;
    this.outerPath = this.circlePath(
      radius,
      radius,
      radiusOuter,
      0,
      maxAngle * (data[0] / max)
    );
    this.middlePath = this.circlePath(
      radius,
      radius,
      radiusMiddle,
      0,
      maxAngle * (data[1] / max)
    );
    this.innerPath = this.circlePath(
      radius,
      radius,
      radiusInner,
      0,
      maxAngle * (data[2] / max)
    );
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.animateFill();
    } else {
      return;
    }
  }

  animateFill = () => {
    var data = this.props.data.map(e => e.value);
    var max = Math.max(data[0], data[1], data[2]);
    var { duration, maxAngle } = this.props;
    Animated.parallel([
      Animated.timing(this.state.innerStroke, {
        toValue: (2 * Math.PI * this.innerPath.path[1] * data[0]) / max,
        duration: duration
      }),
      Animated.timing(this.state.middleStroke, {
        toValue: (2 * Math.PI * this.middlePath.path[1] * data[1]) / max,
        duration: duration
      }),
      Animated.timing(this.state.outerStroke, {
        toValue: (2 * Math.PI * this.outerPath.path[1] * data[2]) / max,
        duration: duration
      })
    ]).start();
  };

  render() {
    var { innerStroke, middleStroke, outerStroke } = this.state;
    var { ...other } = this.props;
    return (
      <AnimatedRadialProgress
        {...other}
        innerLength={innerStroke}
        middleLength={middleStroke}
        outerLength={outerStroke}
        innerPath={this.innerPath}
        middlePath={this.middlePath}
        outerPath={this.outerPath}
      />
    );
  }
}

AnimRadialChart.propTypes = {
  duration: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  rotation: PropTypes.number.isRequired,
  maxAngle: PropTypes.number.isRequired,
  offsetFactor: PropTypes.number.isRequired,
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  color3: PropTypes.string.isRequired
};

AnimRadialChart.defaultProps = {
  duration: 2000,
  maxAngle: 270,
  offsetFactor: 1.3,
  radius: 75,
  rotation: -135,
  strokeWidth: 5,
  color1: "#ff0000",
  color2: "#00ff00",
  color3: "#0000ff"
};

export { AnimRadialChart as RadialChart };
