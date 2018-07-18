import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Legend, RadialChart } from './components';

export default class App extends React.Component {
  render() {
    var data = [
    {
      name: "one",
      value: 200
    },
    {
      name: "one",
      value: 400
    },
    {
      name: "one",
      value: 500
    }]
    return (
      <View style={styles.container}>
        <Legend data={data} duration={2000} />
        <RadialChart data={data} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
