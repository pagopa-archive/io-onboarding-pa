import "../node_modules/react-app-polyfill/ie11";
import "../node_modules/react-app-polyfill/stable";

import React from "react";
import { render } from "react-dom";

import "./i18n";

import { CookiesProvider } from "react-cookie";
import { App } from "./App";
import { AlertContextProvider } from "./context/alert-context";
import { LoadingPageContextProvider } from "./context/loading-page-context";

const app = (
  <AlertContextProvider>
    <LoadingPageContextProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </LoadingPageContextProvider>
  </AlertContextProvider>
);

render(app, document.getElementById("root"));
