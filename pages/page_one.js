import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { faux_data } from "../__json_http__/dummy_data";
import { Legend, Line, RadialChart } from "../components";
import { fetchData } from "../services";
import { fetchDataSuccess } from "../redux";
import { combination_selector, convertDateTime } from "../services";

class PageOne extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		faux_data.forEach(e => {
			var pdate = convertDateTime(e.date);
			e.date = pdate;
		});
		this.props.dispatch(fetchDataSuccess(faux_data));
	}
	render() {
		var { data } = this.props;
		if (data.length > 0) {
			return <Line data={data} />
		}
		return <Text>No data present</Text>;
	}
}

const mapStateToProps = state => {
	return {
		data: combination_selector(
			state.data.data,
			state.range.start,
			state.range.end,
			state.zoom.start,
			state.zoom.end
		)
	};
};

const ConnectedPage = connect(mapStateToProps)(PageOne);

export { ConnectedPage as PageOne };
