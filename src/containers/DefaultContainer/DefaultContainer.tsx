import * as React from "react";
import { Route } from "react-router";
import { CentralHeader } from "../CentralHeader/CentralHeader";
import { SlimHeader } from "../SlimHeader/SlimHeader";
import { RegistrationContainer } from "../RegistrationContainer/RegistrationContainer";
import { Dashboard } from "../Dashboard/Dashboard";
import { SpidLogin } from "../SpidLogin/SpidLogin";
import { UserSettings } from "../UserSettings/UserSettings";

import "./DefaultContainer.css";

export const DefaultContainer: React.FC = () => {
  const [userProfile, setUserProfile] = React.useState({
    email: "",
    fiscalCode: "",
    name: "",
    role: ""
  });

  return (
    <div className="DefaultContainer">
      <SlimHeader />
      <CentralHeader userName={userProfile.name} />
      <div className="app-body-mt">
        <Route
          path="/registrazione/:registrationStep"
          exact
          component={RegistrationContainer}
        />
        <Route path="/spid-login" component={SpidLogin} />
        <Route
          path="/dashboard"
          render={() => <Dashboard setUserProfileData={setUserProfile} />}
        />
        <Route
          path="/profile"
          render={() => <UserSettings userProfile={userProfile} />}
        />
      </div>
    </div>
  );
};
