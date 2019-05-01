import React, { Component } from "react";
// const ReactHighstock = require("react-highcharts/ReactHighstock.src");
const ReactHighstock = require("react-highcharts");
const Highlight = require("react-highlight");

export class CSVParsingChart extends Component {
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
        categories: this.props.formattedXAxisDataForChartLine,

        labels: {
          align: "right",
          rotation: "-45"
        }
      },
      series: [
        {
          name: "MSFT",
          data: this.props.formattedYAxisDataForChartLine,
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
        {console.log("X AXIS", this.props.formattedXAxisDataForChartLine)}
        {console.log("Y AXIS", this.props.formattedYAxisDataForChartLine)}
        <ReactHighstock config={config} />
        );
      </div>
    );
  }
}

export default CSVParsingChart;

/*
series: [
        {
          name: "MSFT",
          data: this.props.formattedDataForChartStoks,
          tooltip: {
            valueDecimals: 2
          }
        }
      ]
*/
