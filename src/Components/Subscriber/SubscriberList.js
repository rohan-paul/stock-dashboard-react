import React, { Component } from "react";
// import history from "../../history";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styles from "./Styles/analyticsStyles.js";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import SandP500_PE from "./SandP500_PE";

export class Analytics extends Component {
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
              <SandP500_PE />
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
