import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DefaultContainer } from "./components/DefaultContainer/DefaultContainer";
import { Home } from "./components/Home/Home";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";

import "../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./App.scss";
import { ScrollToTop } from "./components/ScrollToTop";

/**
 * Entry point for app, with first level routing
 */
export const App = () => {
  const redirectToHome = () => <Redirect to="/home" />;

  return (
    <BrowserRouter>
      <ScrollToTop>
        <div className="App vh-100">
          <Switch>
            <Route exact={true} path="/" component={redirectToHome} />
            <Route path="/home" component={Home} />
            <Route
              path="/(creating-docs|docs-sent)"
              component={LoadingScreen}
            />
            <Route path="/*" component={DefaultContainer} />
          </Switch>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
};
