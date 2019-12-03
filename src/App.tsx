import React from "react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./App.scss";
import { AppAlertTemplate } from "./components/AppAlert/AppAlertTemplate";
import { DefaultContainer } from "./components/DefaultContainer/DefaultContainer";
import { Home } from "./components/Home/Home";
import { ScrollToTop } from "./components/ScrollToTop";

/**
 * Entry point for app, with first level routing
 */
export const App = () => {
  const redirectToHome = () => <Redirect to="/home" />;

  const alertOptions = {
    containerStyle: {
      bottom: "30px",
      // center alert to text column of registration pages
      left: "41.666667%",
      zIndex: 1050
    },
    offset: "0px",
    position: positions.BOTTOM_CENTER,
    timeout: 10000,
    transition: transitions.FADE
  };

  return (
    <BrowserRouter>
      <ScrollToTop>
        <AlertProvider template={AppAlertTemplate} {...alertOptions}>
          <div className="App vh-100">
            <Switch>
              <Route exact={true} path="/" component={redirectToHome} />
              <Route path="/home" component={Home} />
              <Route path="/*" component={DefaultContainer} />
            </Switch>
          </div>
        </AlertProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
