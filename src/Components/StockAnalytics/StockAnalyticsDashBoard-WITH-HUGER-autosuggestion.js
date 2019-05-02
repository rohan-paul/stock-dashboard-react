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

const { allStockSymbols } = require("../all-stock-symbols-from-iextrading");
const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

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
    stockTicker: ""
  };

  // HO function to handle Autocompletion field value change
  handleAutocompletionChange = name => value => {
    this.setState({
      stockTicker: value.value
    });
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }
      })
    };

    return (
      <React.Fragment>
        {console.log("TICKER IS", this.state.stockTicker)}
        <div style={{ margin: "70px auto 0", maxWidth: 800 }}>
          <Select
            onChange={this.handleAutocompletionChange("single")}
            filterOption={createFilter({ ignoreAccents: false })} // this makes all the difference to handle very large number of list
            components={{ MenuList }}
            options={allStockSymbols}
            value={this.state.stockTicker}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "row" }}
          className={classes.root}
        >
          <Paper className={classes.bottomLeftPaper}>
            <Typography variant="h6" component="h6">
              Selected Stock
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
    );
  }
}

StockAnalyticsDashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StockAnalyticsDashBoard);

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
*/
