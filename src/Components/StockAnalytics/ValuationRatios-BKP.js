import React, { Component } from "react";
const ReactHighChart = require("react-highcharts");
const { ma, dma, ema, sma, wma } = require("moving-averages");

export class ValuationRatios extends Component {
  render() {
    const config = {
      chart: {
        backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [[0, "rgb(255, 255, 255)"], [1, "rgb(247, 247, 152)"]]
        },
        polar: true,
        type: "column"
      },
      xAxis: {
        categories: this.props.xSeriesDataForValuationRatios,
        crosshair: true,

        labels: {
          align: "right",
          rotation: "-45"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Numbers in ratio"
        }
      },
      series: this.props.ySeriesDataForValuationRatios,
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },

      title: {
        text: `${this.props.stockTicker}`
      }
    };
    return (
      <div>
        {/* {console.log("X AXIS", this.props.xAxisData)}
        {console.log("Y AXIS", this.props.yAxisData)}*/}
        {console.log(
          "FUNDAMENTALS Y-5 ",
          this.props.ySeriesDataForValuationRatios
        )}
        <ReactHighChart config={config} />
        );
      </div>
    );
  }
}

export default ValuationRatios;
