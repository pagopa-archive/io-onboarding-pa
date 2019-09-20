import React from "react";
import { render } from "react-dom";

import { App } from "./App";
import { TokenContextProvider } from "./context/token-context";

render(
  <TokenContextProvider>
    <App />
  </TokenContextProvider>,
  document.getElementById("root")
);
