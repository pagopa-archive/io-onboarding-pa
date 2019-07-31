import * as React from "react";
import { render } from "react-dom";
import WebFont from "webfontloader";

import { App } from "./App";

WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700"]
  }
});

render(<App />, document.getElementById("root"));
