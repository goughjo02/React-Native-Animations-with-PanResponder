import React from 'react'
import { connect } from 'react-redux';
import { ART, Text, View } from 'react-native';

import { Styles } from './history/styles';
import { fetchData } from "../services";
import { DataApi } from '../config';

class Test extends React.Component {
	componentDidMount() {
		// Get time series data from API
		// this.props.dispatch(fetchData(DataApi.timeSeries()));
		console.log(DataApi.timeSeries())
	}
	render() {
		console.log(this.props)
		return (
			<View style={[Styles.justifyCenter, Styles.alignCenter, Styles.flexGrow]}>
			<Text>hello world</Text>
			</View>
			)
	}
}

const mapStateToProps = state => {
	return {
		data: state.data.data.length
	}
}

const ConnectedComponent = connect(mapStateToProps)(Test)

export { ConnectedComponent as Test };