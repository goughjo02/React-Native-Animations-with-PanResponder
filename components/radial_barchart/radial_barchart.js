import React from "react";
import { Art, View } from "react-native";
const { Surface, Shape, Path, Group } = ART;
import PropTypes from 'prop-types';

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
    const { radius, Width } = this.props;
    const offset = Width * 1.3;
    const { outer, mid, inner } = this.props.colorsScheme;
    const { outerData, midData, innerData } = this.props;
    const outerPath = this.circlePath(
      radius,
      radius,
      radius - Width / 2,
      0,
      360
    );
    const midPath = this.circlePath(
      radius,
      radius,
      radius - Width / 2 - offset,
      0,
      360
    );
    const innerPath = this.circlePath(
      radius,
      radius,
      radius - Width / 2 - offset * 2,
      0,
      360
    );
    const outerCirc = 2 * Math.PI * (radius - Width / 2);
    const midCirc = 2 * Math.PI * (radius - Width / 2 - offset);
    const innerCirc = 2 * Math.PI * (radius - Width / 2 - offset * 2);
    const rotation = -135;
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
                stroke={outer}
                strokeDash={[outerData, outerCirc * 4]}
                strokeWidth={Width}
                strokeCap="round"
              />
              <Shape
                d={midPath}
                stroke={mid}
                strokeDash={[midData, midCirc * 4]}
                strokeWidth={12}
                strokeCap="round"
              />
              <Shape
                d={innerPath}
                stroke={inner}
                strokeDash={[innerData, innerCirc * 4]}
                strokeWidth={12}
                strokeCap="round"
              />
            </Group>
          </Surface>
        </View>
      </React.Fragment>
    );
  }
}

RadialChart.propTypes = {
  radius: PropTypes.number.isRequired,
  Width: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  color3: PropTypes.string.isRequired
}

RadialChart.defaultProps = {
  radius: 75,
  Width: 150,
  color1: "#ff0000",
  color2: "#00ff00",
  color3: "#0000ff"
}

export { RadialChart }
