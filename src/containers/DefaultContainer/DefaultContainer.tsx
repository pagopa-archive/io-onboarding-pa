import * as React from "react";
import { Route } from "react-router";
import { CentralHeader } from "../CentralHeader/CentralHeader";
import { SlimHeader } from "../SlimHeader/SlimHeader";
import { RegistrationContainer } from "../RegistrationContainer/RegistrationContainer";
import { Dashboard } from "../Dashboard/Dashboard";

import "./DefaultContainer.css";

export const DefaultContainer: React.FC = () => {
  return (
    <div className="DefaultContainer">
      <SlimHeader />
      <CentralHeader userName="Luca Prete" />
      <div className="app-body-mt">
        <Route path="/registrazione/:registrationStep" exact component={RegistrationContainer} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </div>
  );
};
