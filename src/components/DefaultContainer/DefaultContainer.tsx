import React, { useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { EmailAddress } from "../../../generated/definitions/api/EmailAddress";
import { FiscalCode } from "../../../generated/definitions/api/FiscalCode";
import { UserProfile } from "../../../generated/definitions/api/UserProfile";
import { UserRole } from "../../../generated/definitions/api/UserRole";
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
  email: EmailAddress;
  family_name: string;
  fiscal_code: FiscalCode;
  given_name: string;
  role: UserRole;
  work_email?: EmailAddress;
}

/**
 * Component containing slim header, central header and app body with second level routing
 */
export const DefaultContainer = () => {
  /**
   * Initial state for user profile
   */
  const initialUserProfile: UserProfile = {
    email: "" as EmailAddress,
    family_name: "",
    fiscal_code: "" as FiscalCode,
    given_name: "",
    role: "" as UserRole,
    work_email: undefined
  };

  const [userProfile, setUserProfile] = useState<
    IDefaultContainerUserProfileState
  >(initialUserProfile);

  /*
   * Handle response from getUserProfile
   * */
  const handleGetUserProfile = (newUserProfile: UserProfile) => {
    setUserProfile(newUserProfile);
  };

  const navigateToDashboard = (props: RouteComponentProps) => (
    <Dashboard {...props} onGetUserProfile={handleGetUserProfile} />
  );
  const navigateToUserSettings = () => <UserSettings />;

  return (
    <div className="DefaultContainer">
      <SlimHeader />
      <CentralHeader
        userName={`${userProfile.given_name} ${userProfile.family_name}`}
        userRole={userProfile.role}
      />
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
