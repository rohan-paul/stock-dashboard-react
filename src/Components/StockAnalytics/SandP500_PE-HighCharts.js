import React, { Component } from "react";
import Highcharts from "highcharts";
import axios from "axios";
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Subtitle,
  Legend,
  LineSeries
} from "react-jsx-highcharts";
const _ = require("lodash");

const plotOptions = {
  series: {
    pointStart: 2010
  }
};

// var FirstDay = new Date(2018, 0, 1);
// var LastDay = new Date(2018, 12 + 1, 0);

export class SandP500_PE extends Component {
  state = {
    s_and_p_500_pe_ratio: []
  };

  componentDidMount() {
    axios
      .get(
        "https://www.quandl.com/api/v3/datasets/MULTPL/SP500_PE_RATIO_MONTH.json?api_key=xVgPxg_akYvyDdHhqEox"
      )
      .then(res => {
        this.setState({
          s_and_p_500_pe_ratio: res.data.dataset.data
        });
      });
  }
  render() {
    const { s_and_p_500_pe_ratio } = this.state;

    const givenData1 = _.flatten(
      s_and_p_500_pe_ratio.map(i => {
        return i.slice(1, 2);
      })
    );

    return (
      <div className="app">
        {/* {console.log("FIRST DAY", FirstDay)}
        {console.log("LAST DAY", LastDay)}*/}
        <HighchartsChart plotOptions={plotOptions}>
          <Chart />

          <Title>S&P 500 P/E ratio during same time</Title>

          <Subtitle>Source: www.quandl.com.com</Subtitle>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>P/E Ratio</YAxis.Title>
            <LineSeries name="Installation" data={givenData1} />
          </YAxis>
        </HighchartsChart>
      </div>
    );
  }
}

// export default SandP500_PE;

export default withHighcharts(SandP500_PE, Highcharts);
