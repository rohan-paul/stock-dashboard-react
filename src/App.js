import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Router, Link } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import history from "./history";
import SubscriberList from "./Components/Subscriber/SubscriberList";
import NotFound from "./Components/NotFound";
import ComponentHeader from "./Components/ComponentHeader";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  state = {
    firstExpandedFieldData: [],
    isSideDrawerOpen: false
  };

  onSideDrawerOpen = () => {
    this.setState({
      isSideDrawerOpen: true
    });
  };

  onSideDrawerClose = () => {
    this.setState({
      isSideDrawerOpen: false
    });
  };

  render() {
    const { firstExpandedFieldData } = this.state;

    const pad = 16;
    const appBarHeight = 74;
    const drawerWidth = 240;

    const left = this.state.isSideDrawerOpen ? drawerWidth : 85;
    const top = appBarHeight;

    const width = this.state.isSideDrawerOpen
      ? "calc(100% - " + (drawerWidth + 2 * pad) + "px)"
      : "calc(100% - " + 2 * (pad + 50) + "px)";

    const contentStyle = {
      width: width,
      marginTop: top + pad,
      marginLeft: left + pad,
      marginBottom: pad,
      marginRight: pad,

      padding: 0
    };

    return (
      <div>
        <BrowserRouter>
          <Router history={history}>
            <div>
              <ComponentHeader
                onSideDrawerOpen={this.onSideDrawerOpen}
                onSideDrawerClose={this.onSideDrawerClose}
              />
              <div style={contentStyle}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <SubscriberList
                        {...props}
                        firstExpandedFieldData={firstExpandedFieldData}
                      />
                    )}
                  />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
