import React, { Component } from "react";
const ReactHighChart = require("react-highcharts");
const { ma, dma, ema, sma, wma } = require("moving-averages");

export class StockLineChart extends Component {
  render() {
    const config = {
      chart: {
        backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [[0, "rgb(255, 255, 255)"], [1, "rgb(247, 247, 152)"]]
        }
      },
      title: {
        text: `${
          this.props.stockTicker
        } only disadvantage for most stocks the "newest_available_date" is "2018-03-27" for thw Quandl Free API`
      },
      yAxis: {
        title: {
          text: "Price in USD"
        }
      },
      xAxis: {
        categories: this.props.xAxisData,

        labels: {
          align: "right",
          rotation: "-45"
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      series: [
        {
          name: `${this.props.stockTicker || "Closing Price"}`,
          data: this.props.yAxisData_StockClosingPrice.reverse()
        },
        {
          name: `Moving Averages`,
          color: "red",
          data: ma(this.props.yAxisData_StockClosingPrice, 5)
            .slice(4)
            .reverse()
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 800
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    };
    return (
      <div>
        {/*{console.log("X AXIS", this.props.xAxisData)}
        {console.log("Y AXIS", this.props.yAxisData_StockClosingPrice)}*/}
        <ReactHighChart config={config} />
        );
      </div>
    );
  }
}

export default StockLineChart;
