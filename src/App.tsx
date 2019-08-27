import * as React from "react";

import "./App.scss";

export const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="primary-bg white-color">Piattaforma Onboard PA</h1>
      <h1 className="primary-bg white-color">{ process.env.REACT_APP_NOT_SECRET_CODE }</h1>
    </div>
  );
};
