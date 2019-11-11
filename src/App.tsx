import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DefaultContainer } from "./components/DefaultContainer/DefaultContainer";
import { Home } from "./components/Home/Home";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import { ScrollToTop } from "./components/ScrollToTop";

import "../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./App.scss";

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
            <Route path="/(creating-docs|docs-sent)" component={LoadingPage} />
            <Route path="/*" component={DefaultContainer} />
          </Switch>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
};
