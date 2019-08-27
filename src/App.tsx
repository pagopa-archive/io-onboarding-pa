import * as React from "react";

import "./App.scss";

export const App: React.FC = () => {
  console.log(window._env_.REACT_APP_NOT_SECRET_CODE);

  return (
    <div className="App">
      <h1 className="primary-bg white-color">Piattaforma Onboard PA</h1>
      <h1 className="primary-bg white-color">{ window._env_.REACT_APP_NOT_SECRET_CODE }</h1>
    </div>
  );
};
