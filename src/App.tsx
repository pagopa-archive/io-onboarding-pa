import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { DefaultContainer } from "./containers/DefaultContainer/DefaultContainer";
import { Home } from "./containers/Home/Home";
import { LoadingScreen } from "./containers/LoadingScreen/LoadingScreen";

import "../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./App.scss";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App h-100">
        <Route path="/" exact component={Home} />
        <Route path="/(generazione-documenti|conferma-documenti)" component={LoadingScreen} />
        <Route path="/*" component={DefaultContainer} />
      </div>
    </BrowserRouter>
  );
};
