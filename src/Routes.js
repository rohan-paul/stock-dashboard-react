import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Router, Link } from "react-router-dom";
import SubscriberList from "./Components/Subscriber/SubscriberList";
import NotFound from "./Components/NotFound";

class Routes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact exact path={"/"} component={SubscriberList} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
