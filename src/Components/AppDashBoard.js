import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import SiteDesign from "./SiteDesign/SiteDesign";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = theme =>
  createMuiTheme({
    palette: {
      type: theme ? "dark" : "light",
      text: {
        main: "#000000"
      },
      primary: {
        main: theme ? "#f32c2c" : "#f7f71c"
      }
    },
    typography: {
      useNextVariants: true
    }
  });

class AppDashBoard extends Component {
  state = {
    themeType: false,
    files: [],
    data: []
  };

  handleThemeTypeChange = () => {
    this.state.themeType
      ? this.setState({
          themeType: false
        })
      : this.setState({
          themeType: true
        });
  };

  render() {
    const { themeType, data } = this.state;

    return (
      <MuiThemeProvider theme={theme(themeType)}>
        <React.Fragment>
          <CssBaseline />
          <SiteDesign
            handleThemeTypeChange={this.handleThemeTypeChange}
            themeType={themeType}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default AppDashBoard;
