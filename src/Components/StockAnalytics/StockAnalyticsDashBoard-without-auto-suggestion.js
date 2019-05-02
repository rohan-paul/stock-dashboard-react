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
import SearchBar from "material-ui-search-bar-enhanced";
// import NoSsr from "@material-ui/core/NoSsr";
// import Select from "react-select";
// import Control from "./Autocomplete/Control";
// import NoOptionsMessage from "./Autocomplete/NoOptionsMessage";
// import MultiValue from "./Autocomplete/MultiValue";
// import ValueContainer from "./Autocomplete/ValueContainer";
// import SingleValue from "./Autocomplete/SingleValue";
// import Placeholder from "./Autocomplete/Placeholder";
// import Option from "./Autocomplete/Option";
// import Menu from "./Autocomplete/Menu";

// const { allStockSymbols } = require("../all-stock-symbols-from-iextrading");

// const components = {
//   Control,
//   Menu,
//   MultiValue,
//   NoOptionsMessage,
//   Option,
//   Placeholder,
//   SingleValue,
//   ValueContainer
// };

export class StockAnalyticsDashBoard extends Component {
  state = {
    stockTicker: ""
  };

  // Handling Autocompletion field value change
  //   handleAutocompletionChange = name => value => {
  //     this.setState({
  //       [name]: value,
  //       stockTicker: value.label
  //     });
  //   };

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
      <MuiThemeProvider>
        <React.Fragment>
          {console.log("TICKER IS", this.state.stockTicker)}
          <SearchBar
            onChange={value => this.setState({ stockTicker: value })}
            onRequestSearch={() => console.log("onRequestSearch")}
            style={{
              margin: "70px auto 0",
              maxWidth: 800
            }}
          />
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
      </MuiThemeProvider>
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


   this.state = {
      s_and_p_500_pe_ratio: []
    };

*/
