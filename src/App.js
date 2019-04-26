import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Router } from "react-router-dom";
import history from "./history";
import NotFound from "./Components/NotFound/NotFound";
import StockAnalyticsDashBoard from "./Components/StockAnalytics/StockAnalyticsDashBoard";
import AppDashBoard from "./Components/AppDashBoard";
import CSVParsing from "./Components/CSVParsing/CSVParsing";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFilter,
  faDownload,
  faCalendarAlt,
  faShip,
  faAnchor,
  faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(faFilter, faDownload, faCalendarAlt, faShip, faAnchor, faUser);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path={"/"} component={AppDashBoard} />

              <Route
                exact
                path={"/stock_dashboard"}
                component={StockAnalyticsDashBoard}
              />
              <Route exact path={"/csvparsing"} component={CSVParsing} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
