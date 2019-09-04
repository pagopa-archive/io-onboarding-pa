import React, { Dispatch, SetStateAction, useState } from "react";
import { Route } from "react-router";
import { CentralHeader } from "../CentralHeader/CentralHeader";
import { DelegateDashboard } from "../DelegateDashboard/DelegateDashboard";
import { SignUpContainer } from "../SignUpContainer/SignUpContainer";
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
  const [userProfile, setUserProfile] = useState<
    IDefaultContainerUserProfileState
  >({
    email: "",
    fiscalCode: "",
    name: "",
    role: ""
  });

  const handleSetUserProfile = (
    newUserProfile: IDefaultContainerUserProfileState
  ) => {
    setUserProfile(newUserProfile);
  };

  return (
    <div className="DefaultContainer">
      <SlimHeader />
      <CentralHeader userName={userProfile.name} userRole={userProfile.role} />
      <div className="pt-app-body">
        <Route path="/spid-login" component={SpidLogin} />
        <Route path="/sign-up/:signUpStep" exact component={SignUpContainer} />
        <Route
          path="/delegate-dashboard"
          render={() => <DelegateDashboard />}
        />
        <Route path="/profile" render={() => <UserSettings />} />
      </div>
    </div>
  );
};
