import React, { Component } from "react";
// import history from "../../history";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styles from "./Styles/analyticsStyles.js";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import SandP500_PE from "./SandP500_PE";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Select, { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import StockLineChart from "./StockLineChart";
// const moment = require("moment");

const height = 35;

// I had to resort to this special way of rendering react-select for handling 30,000 rows of data in the autosuggestion
class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    // const initialOffset = height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}

// Function to convert the date format that I received from "material-ui-pickers" package to the YYYY-MM-DD required by the Quandl API
const convertDateFromStringToAPIFormat = str => {
  const date = new Date(str);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join("-");
};

export class StockAnalyticsDashBoard extends Component {
  state = {
    stockTicker: "",
    stockTickerAndLabel: "",
    symbolList: [],
    fromDate: "",
    toDate: "",
    xAxisData: [],
    yAxisData: []
  };

  // Higher order function to handle Autocompletion field value change
  handleAutocompletionChange = name => value => {
    this.setState(
      {
        stockTicker: value.value
      },
      () => {
        const stockTickerWithName = this.state.symbolList.filter(i => {
          return i.value === this.state.stockTicker;
        })[0].label;
        this.setState({
          stockTickerAndLabel: stockTickerWithName
        });
      }
    );
  };

  componentDidMount() {
    axios
      .get("https://api.iextrading.com/1.0/ref-data/symbols?filter=symbol,name")
      .then(res => {
        this.setState({
          symbolList: res.data.map(item => ({
            value: item.symbol,
            label: `${item.symbol} ${item.name}`
          }))
        });
      });
  }

  handleSubmitToFetchAPI = () => {
    const { stockTicker, fromDate, toDate } = this.state;
    const APIkey = process.env.REACT_APP_QUANDL_API_KEY;

    if (stockTicker !== "" && fromDate !== "" && toDate !== "") {
      const url = `https://www.quandl.com/api/v3/datasets/WIKI/${stockTicker}.json?start_date=${fromDate}&end_date=${toDate}&column_index=4&api_key=${APIkey}`;

      axios
        .get(url)
        .then(res => {
          if (res.data.dataset.data.length !== 0) {
            const receivedStockClosingData = res.data.dataset.data;
            const closingPriceDate = receivedStockClosingData.map(i => i[0]);
            const closingPrice = receivedStockClosingData.map(i => i[1]);
            console.log("RECEIVED DATA ", receivedStockClosingData);
            this.setState({
              xAxisData: closingPriceDate,
              yAxisData: closingPrice
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  handleFromDateChange = date => {
    const fromDateFormatted = convertDateFromStringToAPIFormat(date);
    this.setState({
      fromDate: fromDateFormatted
    });
  };

  handleToDateChange = date => {
    const toDateFormatted = convertDateFromStringToAPIFormat(date);
    this.setState({
      toDate: toDateFormatted
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        width: "20em",
        margin: "auto",

        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <React.Fragment>
          <Paper className={classes.topSearchBarPaper}>
            <div className={classes.reactSelectAndDatePicker}>
              <div>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  onChange={this.handleAutocompletionChange("single")}
                  filterOption={createFilter({ ignoreAccents: false })} // this makes all the difference to handle very large number of list
                  components={{ MenuList }}
                  options={this.state.symbolList}
                  value={this.state.stockTicker}
                />
              </div>
              <div className={classes.bothDatePicker}>
                <DatePicker
                  className={classes.individualDatePicker}
                  keyboard
                  format="dd/MM/yyyy"
                  mask={value =>
                    value
                      ? [
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/
                        ]
                      : []
                  }
                  label="From Date"
                  disableOpenOnEnter
                  animateYearScrolling={false}
                  value={this.state.fromDate}
                  onChange={this.handleFromDateChange}
                />
                <DatePicker
                  className={classes.individualDatePicker}
                  keyboard
                  format="dd/MM/yyyy"
                  mask={value =>
                    value
                      ? [
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          "/",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/
                        ]
                      : []
                  }
                  label="To Date"
                  disableOpenOnEnter
                  animateYearScrolling={false}
                  value={this.state.toDate}
                  onChange={this.handleToDateChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.handleSubmitToFetchAPI}
                  type="submit"
                >
                  Get data
                  {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
            </div>
          </Paper>

          <div
            style={{ display: "flex", flexDirection: "row" }}
            className={classes.root}
          >
            <Paper className={classes.bottomLeftPaper}>
              <Typography variant="h6" component="h6">
                Selected Stock {this.state.stockTickerAndLabel}
                <StockLineChart
                  xAxisData={this.state.xAxisData}
                  yAxisData={this.state.yAxisData}
                  stockTicker={this.state.stockTicker}
                />
              </Typography>
            </Paper>

            <Paper className={classes.bottomRightPaper}>
              <Typography variant="h6" component="h6">
                S&P 500 P/E ratio during same time
                {this.state.fromDate !== "" && this.state.toDate !== "" ? (
                  <SandP500_PE
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                  />
                ) : null}
              </Typography>
            </Paper>
          </div>
        </React.Fragment>
      </MuiPickersUtilsProvider>
    );
  }
}

StockAnalyticsDashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(StockAnalyticsDashBoard);

/* 1> Explanation on the two function getXAxis and getYAxis

Received data from API will be as below
"data": [
            ["2018-02-23", 183.29],
            ["2018-02-22", 178.99], ]

But for the line-graph I need

var config = {
  xAxis: {
    categories: ["2018-02-23", '2018-02-22']
  },
  series: [{
    data: [29.9, 71.5 ]
  }]
};

*/

/*

  ////////////////////////////
  {console.log("SYMBOLS IS", this.state.tickerSelectedByUser)}
          {console.log("START DATE IS", this.state.fromDate)}
          {console.log("TO DATE IS", this.state.toDate)}
          {console.log("X AXIS DATA ", this.state.xAxisData)}
*/
