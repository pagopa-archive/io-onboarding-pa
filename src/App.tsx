import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DefaultContainer } from "./components/DefaultContainer/DefaultContainer";
import { Home } from "./components/Home/Home";
import { ScrollToTop } from "./components/ScrollToTop";

import {
  AlertComponentPropsWithStyle,
  positions,
  Provider as AlertProvider,
  transitions,
  types
} from "react-alert";
import { Alert } from "reactstrap";
import "../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./App.scss";

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

  const AlertTemplate = ({
    style,
    options,
    message,
    close
  }: AlertComponentPropsWithStyle) => (
    <div style={style} className="AppAlert">
      <Alert
        // fix for different names: bootstrap uses "danger", react-alert uses "error"
        color={options.type === types.ERROR ? "danger" : options.type}
        toggle={close}
        className="mt-2 mb-0"
      >
        {message}
      </Alert>
    </div>
  );

  return (
    <BrowserRouter>
      <ScrollToTop>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
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
