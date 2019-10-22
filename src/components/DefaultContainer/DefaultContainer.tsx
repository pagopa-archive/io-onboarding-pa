import React, { useState } from "react";
import { Route } from "react-router";
import { AppAlert } from "../AppAlert/AppAlert";
import { CentralHeader } from "../CentralHeader/CentralHeader";
import { Dashboard } from "../Dashboard/Dashboard";
import { RegistrationContainer } from "../Registration/RegistrationContainer";
import { SlimHeader } from "../SlimHeader/SlimHeader";
import { SpidLogin } from "../SpidLogin/SpidLogin";
import { UserSettings } from "../UserSettings/UserSettings";

/**
 * part of Default Container state responsible of user profile entity
 */
interface IDefaultContainerUserProfileState {
  email: string;
  fiscalCode: string;
  name: string;
  role: string;
}

/**
 * Component containing slim header, central header and app body with second level routing
 */
export const DefaultContainer = () => {
  /**
   * Initial state for user profile
   */
  const [userProfile] = useState<IDefaultContainerUserProfileState>({
    email: "",
    fiscalCode: "",
    name: "",
    role: ""
  });

  const navigateToDashboard = () => <Dashboard />;
  const navigateToUserSettings = () => <UserSettings />;

  return (
    <div className="DefaultContainer">
      <SlimHeader />
      <CentralHeader userName={userProfile.name} userRole={userProfile.role} />
      <div>
        <AppAlert />
        <Route path="/spid-login" component={SpidLogin} />
        <Route
          path="/sign-up/:signUpStep"
          exact={true}
          component={RegistrationContainer}
        />
        <Route path="/dashboard" render={navigateToDashboard} />
        <Route path="/profile" render={navigateToUserSettings} />
      </div>
    </div>
  );
};
