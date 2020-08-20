import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import NotFound from "../Components/NotFound/NotFound";
import StockAnalyticsDashBoard from "../Components/StockAnalytics/StockAnalyticsDashBoard";
import AppDashBoard from "../Components/AppDashBoard";
import CSVParsing from "../Components/CSVParsing/CSVParsing";
import BitCoin from "../Components/BitCoin/BitCoin";
import DashBoard from "../Dashboard";

export class DashboardRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/"} component={DashBoard} />

          <Route
            exact
            path={"/stock_dashboard"}
            component={StockAnalyticsDashBoard}
          />
          <Route exact path={"/csvparsing"} component={CSVParsing} />
          <Route exact path={"/bitcoin"} component={BitCoin} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default DashboardRoutes;
