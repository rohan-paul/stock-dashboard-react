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

export class StockAnalyticsDashBoard extends Component {
  state = {
    stockTicker: ""
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
