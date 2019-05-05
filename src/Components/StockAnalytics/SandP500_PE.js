import React, { Component } from "react";
import axios from "axios";
const ReactHighstock = require("react-highcharts");

// Function to re-structure the data received from the API
const getDateAndClosingPrice = obj => {
  let xAxis = [];
  let yAxis = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      xAxis.push(key);
      yAxis.push(parseInt(obj[key].close));
    }
  }
  return [xAxis, yAxis];
};

export class SandP500_PE extends Component {
  state = {
    s_and_p_500_index: [],
    closingDate: ""
  };

  componentDidMount() {
    const { fromDate, toDate } = this.props;
    const APIkey = process.env.REACT_APP_WORLD_TRADING_DATA_API_TOKEN;

    const url = `https://www.worldtradingdata.com/api/v1/history?symbol=^INX&date_from=${fromDate}&date_to=${toDate}&sort=newest&api_token=${APIkey}`;

    if (fromDate !== "" && toDate !== "") {
      axios
        .get(url)
        .then(res => {
          if (
            res.data &&
            res.data.history &&
            Object.entries(res.data.history).length !== 0
          ) {
            this.setState({
              closingDate: getDateAndClosingPrice(res.data.history)[0],
              s_and_p_500_index: getDateAndClosingPrice(res.data.history)[1]
            });
          }
        })
        .catch(err => console.log("Error while fetching data ", err));
    }
  }
  render() {
    const { s_and_p_500_index, closingDate } = this.state;

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
        categories: closingDate,

        labels: {
          align: "right",
          rotation: "-45"
        }
      },
      series: [
        {
          name: `S&P`,
          data: s_and_p_500_index,
          tooltip: {
            valueDecimals: 2
          }
        }
      ],

      title: {
        text: `S&P 500 closing from worldtradingdata.com`
      }
    };
    return (
      <div>
        {/*{console.log("X DATA", closingDate)}
        {console.log("Y DATA", s_and_p_500_index)}*/}
        <ReactHighstock config={config} />
        );
      </div>
    );
  }
}

export default SandP500_PE;
