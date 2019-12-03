import "../node_modules/react-app-polyfill/ie11";
import "../node_modules/react-app-polyfill/stable";

import React from "react";
import { render } from "react-dom";

import "./i18n";

import { CookiesProvider } from "react-cookie";
import { App } from "./App";
import { LoadingPageContextProvider } from "./context/loading-page-context";

const app = (
  <LoadingPageContextProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </LoadingPageContextProvider>
);

render(app, document.getElementById("root"));
