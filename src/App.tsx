import * as React from "react";

import "./App.scss";

export const App: React.FC = () => {
  console.log(window._env_.IO_ONBOARDING_PA_API_HOST);
  console.log(window._env_.IO_ONBOARDING_PA_API_PORT);

  return (
    <div className="App">
      <h1 className="primary-bg white-color">Piattaforma Onboard PA</h1>
      <h1 className="primary-bg white-color">{ window._env_.IO_ONBOARDING_PA_API_HOST }:{ window._env_.IO_ONBOARDING_PA_API_PORT }</h1>
    </div>
  );
};
