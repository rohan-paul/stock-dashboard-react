import React, { Component } from "react";
// import history from "../../history";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styles from "./analyticsStyles.js";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

export class Analytics extends Component {
  state = {
    totalExportsForCurrentPort: 0,
    totalImportsForCurrentPort: 0,
    totalRevenueForCurrentPort: 0
  };

  componentDidMount() {
    axios
      .get(
        "https://www.quandl.com/api/v3/datasets/MULTPL/SP500_PE_RATIO_MONTH.json?api_key=xVgPxg_akYvyDdHhqEox"
      )
      .then(res => {
        this.setState({
          s_and_p_500_pe_ratio: JSON.stringify(res.data.dataset.data)
        });
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Paper className={classes.bottomLeftPaper}>
            <Typography variant="h6" component="h6">
              Selected Stock
            </Typography>
          </Paper>

          <Paper className={classes.bottomRightPaper}>
            <Typography variant="h6" component="h6">
              S&P 500 P/E ratio during same time
            </Typography>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Analytics);
