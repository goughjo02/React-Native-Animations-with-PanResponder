import React from "react";
import { Animated, ART, AppState, StyleSheet, View } from "react-native";
const { Surface, Shape, Path, Group } = ART;
import svgPathProperties from 'svg-path-properties';
import PropTypes from "prop-types";

class RadialChart extends React.Component {
  state = { appState: AppState.currentState };
  componentDidMount = () =>
    AppState.addEventListener("change", this.handleAppStateChange);
  componentWillUnmount = () =>
    AppState.removeEventListener("change", this.handleAppStateChange);
  handleAppStateChange = appState => this.setState({ appState });
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
  render() {
    const { maxAngle, radius, rotation, strokWidth } = this.props;
    const offset = strokWidth * 1.3;
    const { color1, color2, color3 } = this.props;
    var data = this.props.data.map(e => e.value);
    var max = Math.max(data[0], data[1], data[2]);
    const outerPath = this.circlePath(
      radius,
      radius,
      radius - strokWidth / 2,
      0,
      maxAngle * (data[0] / max)
    );
    const midPath = this.circlePath(
      radius,
      radius,
      radius - strokWidth / 2 - offset,
      0,
      maxAngle * (data[1] / max)
    );
    const innerPath = this.circlePath(
      radius,
      radius,
      radius - strokWidth / 2 - offset * 2,
      0,
      maxAngle * (data[2] / max)
    );
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
                strokeDash={[100, 50]}
                strokeWidth={strokWidth}
                strokeCap="round"
              />
              <Shape
                d={midPath}
                stroke={color2}
                strokeWidth={strokWidth}
                strokeCap="round"
              />
              <Shape
                d={innerPath}
                stroke={color3}
                strokeWidth={strokWidth}
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
      precent: new Animated.Value(0)
    };
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
    var { duration } = this.props;
    Animated.timing(this.state.precent, {
      toValue: 100,
      duration: duration
    }).start();
  };

  render() {
    const { ...other } = this.props;
    return (
      <AnimatedRadialProgress
        {...other}
        precent={this.state.precent}
      />
    );
  }
}

RadialChart.propTypes = {
  duration: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  strokWidth: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  rotation: PropTypes.number.isRequired,
  maxAngle: PropTypes.number.isRequired,
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  color3: PropTypes.string.isRequired
};

RadialChart.defaultProps = {
  duration: 2000,
  maxAngle: 270,
  radius: 75,
  rotation: -135,
  strokWidth: 12,
  color1: "#ff0000",
  color2: "#00ff00",
  color3: "#0000ff"
};

export { AnimRadialChart as RadialChart };
