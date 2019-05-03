import React, { Component } from "react";
const ReactHighstock = require("react-highcharts");

export class StockLineChart extends Component {
  render() {
    const config = {
      chart: {
        backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [[0, "rgb(255, 255, 255)"], [1, "rgb(247, 247, 152)"]]
        },
        polar: true,
        type: "line"
      },
      xAxis: {
        categories: this.props.xAxisData,

        labels: {
          align: "right",
          rotation: "-45"
        }
      },
      series: [
        {
          name: "MSFT",
          data: this.props.yAxisData,
          tooltip: {
            valueDecimals: 2
          }
        }
      ],

      title: {
        text: "MSFT Stock Price"
      }
    };
    return (
      <div>
        {console.log("X AXIS", this.props.xAxisData)}
        {console.log("Y AXIS", this.props.yAxisData)}
        <ReactHighstock config={config} />
        );
      </div>
    );
  }
}

export default StockLineChart;
