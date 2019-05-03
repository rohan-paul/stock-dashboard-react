import React, { Component } from "react";
// import history from "../../history";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styles from "./Styles/analyticsStyles.js";
import axios from "axios";
import { Row, Col } from "reactstrap";
import Typography from "@material-ui/core/Typography";
import SandP500_PE from "./SandP500_PE";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Select, { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
// const moment = require("moment");

const height = 35;

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

export class StockAnalyticsDashBoard extends Component {
  state = {
    stockTicker: "",
    symbolList: [],
    fromDate: new Date(),
    toDate: new Date()
  };

  // HO function to handle Autocompletion field value change
  handleAutocompletionChange = name => value => {
    this.setState({
      stockTicker: value.value
    });
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
          {console.log("SYMBOLS IS", this.state.stockTicker)}
          {console.log("START DATE IS", this.state.fromDate)}
          {console.log("TO DATE IS", this.state.toDate)}
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
                  onChange={value => {
                    this.setState({
                      fromDate: value
                    });
                  }}
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
                  onChange={value => {
                    this.setState({
                      toDate: value
                    });
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
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
                Selected Stock {this.state.stockTicker}
              </Typography>
            </Paper>

            <Paper className={classes.bottomRightPaper}>
              <Typography variant="h6" component="h6">
                S&P 500 P/E ratio during same time
                <SandP500_PE />
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

/*
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
==================================

   <SearchBar
            onChange={value => this.setState({ stockTicker: value })}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{
              margin: "70px auto 0",
              maxWidth: 800
            }}
          />
==================================
  // ALTERNATIVE (ORIGINAL FROM react-select original) HO function to handle Autocompletion field value change
  handleAutocompletionChange = name => value => {
    this.setState({
      [name]: value,
      stockTicker: value.value
    });
  };

  =====================
  <DatePicker
              keyboard
              margin="normal"
              classes={{
                root: classes.space
              }}
              format="dd/MM/yyyy"
              mask={value =>
                value
                  ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
                  : []
              }
              label="Start Date (of Import)"
              disableOpenOnEnter
              animateYearScrolling={false}
              value={this.state.fromDate}
              onChange={value => {
                this.setState({
                  fromDate: value
                });
              }}
            />
*/
