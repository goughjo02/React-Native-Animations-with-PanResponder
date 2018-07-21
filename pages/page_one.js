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
			e.date = convertDateTime(e.date);
			console.log( typeof e.date)
		});
		this.props.dispatch(fetchDataSuccess(faux_data));
	}
	render() {
		var { data } = this.props;
		if (data.length > 0) {
			console.log(typeof data[0].date);
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
