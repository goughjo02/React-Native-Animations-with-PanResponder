import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Legend, Line, RadialChart } from './components';



function convertDateTime(dateString) {
    var datetime = dateString.split(" ");
    var date = datetime[0].split("-");
    var yyyy = date[0];
    var mm = date[1] - 1;
    var dd = date[2];
    var time = datetime[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]);
    return new Date(yyyy, mm, dd, h, m, s);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linedata: [
    {
        "bought": 0,
        "date": "2012-05-01 00:00:00+00:00",
        "produced": 65,
        "sold": 28,
        "used": 37
    },
    {
        "bought": 6,
        "date": "2012-05-01 01:00:00+00:00",
        "produced": 4,
        "sold": 0,
        "used": 10
    },
    {
        "bought": 2,
        "date": "2012-05-01 02:00:00+00:00",
        "produced": 8,
        "sold": 0,
        "used": 10
    },
    {
        "bought": 5,
        "date": "2012-05-01 03:00:00+00:00",
        "produced": 4,
        "sold": 0,
        "used": 9
    },
    {
        "bought": 3,
        "date": "2012-05-01 04:00:00+00:00",
        "produced": 7,
        "sold": 0,
        "used": 10
    },
    {
        "bought": 0,
        "date": "2012-05-01 05:00:00+00:00",
        "produced": 9,
        "sold": 2,
        "used": 7
    },
    {
        "bought": 0,
        "date": "2012-05-01 06:00:00+00:00",
        "produced": 67,
        "sold": 61,
        "used": 6
    },
    {
        "bought": 0,
        "date": "2012-05-01 07:00:00+00:00",
        "produced": 68,
        "sold": 59,
        "used": 9
    },
    {
        "bought": 0,
        "date": "2012-05-01 08:00:00+00:00",
        "produced": 63,
        "sold": 28,
        "used": 35
    },
    {
        "bought": 0,
        "date": "2012-05-01 09:00:00+00:00",
        "produced": 65,
        "sold": 23,
        "used": 42
    }
    ],
    data: [ 
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
    }
  }
  changeData = () => {
    this.setState({data: [ 
    {
      name: "one",
      value: 600
    },
    {
      name: "one",
      value: 200
    },
    {
      name: "one",
      value: 550
    }]})
    this.setState({
      linedata: [
    {
        "bought": 0,
        "date": "2012-05-01 00:00:00+00:00",
        "produced": 65,
        "sold": 28,
        "used": 37
    },
    {
        "bought": 6,
        "date": "2012-05-01 01:00:00+00:00",
        "produced": 4,
        "sold": 0,
        "used": 10
    },
    {
        "bought": 2,
        "date": "2012-05-01 02:00:00+00:00",
        "produced": 8,
        "sold": 0,
        "used": 10
    },
    {
        "bought": 5,
        "date": "2012-05-01 03:00:00+00:00",
        "produced": 4,
        "sold": 0,
        "used": 9
    },
    {
        "bought": 3,
        "date": "2012-05-01 04:00:00+00:00",
        "produced": 7,
        "sold": 0,
        "used": 10
    },
    {
        "bought": 0,
        "date": "2012-05-01 05:00:00+00:00",
        "produced": 9,
        "sold": 2,
        "used": 7
    },
    {
        "bought": 0,
        "date": "2012-05-01 06:00:00+00:00",
        "produced": 67,
        "sold": 61,
        "used": 6
    }
    ]
    })
  }
  render() {    var { linedata, data } = this.state
    var dataline = linedata.map((e) => {
      e.date = convertDateTime(e.date)
      return e
    })
    return (
      <View style={styles.container}>
      <Button title = " hello" onPress={this.changeData} />
        <Legend data={data} />
        <RadialChart data={data} />
        <Line data={dataline} />
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
