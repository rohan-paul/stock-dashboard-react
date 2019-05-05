import React, { Component } from "react";
const ReactHighChart = require("react-highcharts");

export class AllCryptoCurrencyBarGraph extends Component {
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
          text: "Numbers in dollars"
        }
      },
      series: [
        {
          name: "Other major Crypto Currency Latest Quotes",
          data: this.props.allCryptocurrencyData
        }
      ],

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },

      title: {
        text: `Other major Crypto Currency Latest Quotes`
      },
      subtitle: {
        text:
          'Source: <a href="https://financialmodelingprep.com/">financialmodelingprep.com</a>'
      }
    };
    return (
      <div>
        {/*{console.log("CRYP DATA ", this.props.allCryptocurrencyData)}*/}
        <ReactHighChart config={config} />
      </div>
    );
  }
}

export default AllCryptoCurrencyBarGraph;

// {console.log("FORMATTED CRYP DATA", this.state.allCryptocurrencyData)}
