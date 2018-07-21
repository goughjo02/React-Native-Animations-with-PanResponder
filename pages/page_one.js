import React from 'react';
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { Legend, Line, RadialChart } from '../components';
import { fetchData } from '../services';

class PageOne extends React.Component {
	constructor(props) {
		super(props);
		fetchData("__json_http__/dummy_data.json");
	}
	render() {
		var { data } = this.props;
		if (data.length > 0) {
			return (<Line data={data} />)
		} else return (
			<Text>No data present</Text>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.data.data
	}
}

const ConnectedPage = connect(mapStateToProps)(PageOne)

export { ConnectedPage as PageOne }