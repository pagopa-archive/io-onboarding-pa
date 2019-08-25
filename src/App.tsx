import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DefaultContainer } from "./containers/DefaultContainer/DefaultContainer";
import { Home } from "./containers/Home/Home";
import { LoadingScreen } from "./containers/LoadingScreen/LoadingScreen";

import "./App.scss";
import "./../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route
            path="/(generazione-documenti|conferma-documenti)"
            component={LoadingScreen}
          />
          <Route path="/*" component={DefaultContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
