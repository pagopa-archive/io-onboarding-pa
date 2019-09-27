import React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { AlertContextProvider } from "./context/alert-context";
import { TokenContextProvider } from "./context/token-context";

render(
  <TokenContextProvider>
    <AlertContextProvider>
      <App />
    </AlertContextProvider>
  </TokenContextProvider>,
  document.getElementById("root")
);
