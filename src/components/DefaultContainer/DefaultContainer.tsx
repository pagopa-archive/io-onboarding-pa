import React, { Fragment, useContext, useEffect, useState } from "react";
import { Route, RouteComponentProps, withRouter } from "react-router";
import {
  LogoutModalContext,
  LogoutModalContextProvider
} from "../../context/logout-modal-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../utils/api-utils";

import { constant } from "fp-ts/lib/function";
import { fromNullable } from "fp-ts/lib/Option";
import { NonEmptyString } from "italia-ts-commons/lib/strings";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { EmailAddress } from "../../../generated/definitions/api/EmailAddress";
import { FiscalCode } from "../../../generated/definitions/api/FiscalCode";
import { UserProfile } from "../../../generated/definitions/api/UserProfile";
import { UserRole } from "../../../generated/definitions/api/UserRole";
import { LoadingPageContext } from "../../context/loading-page-context";
import { getConfig } from "../../utils/config";
import { CentralHeader } from "../CentralHeader/CentralHeader";
import { Dashboard } from "../Dashboard/Dashboard";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { AddMailModal } from "../Modal/AddMailModal";
import { LogoutModal } from "../Modal/LogoutModal";
import { RegistrationContainer } from "../Registration/RegistrationContainer";
import { SlimHeader } from "../SlimHeader/SlimHeader";
import { SpidLogin } from "../SpidLogin/SpidLogin";
import { UserProfile as UserProfileComponent } from "../UserProfile/UserProfile";

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
export const DefaultContainer = withRouter(props => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const loadingPageContext = useContext(LoadingPageContext);
  const logoutModalContext = useContext(LogoutModalContext);

  const [cookies] = useCookies(["sessionToken"]);

  const alert = useAlert();

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

  const [isVisibleAddMailModal, setIsVisibleAddMailModal] = useState(false);

  /*
   * Handle response from getUserProfile
   * */
  const handleGetUserProfile = (newUserProfile: UserProfile) => {
    setUserProfile(newUserProfile);
  };

  /*
   * Handle work mail set from modal and profile
   * */
  const handleWorkMailSet = (newWorkMail: EmailAddress) => {
    setUserProfile((prevState: UserProfile) => {
      return { ...prevState, work_email: newWorkMail };
    });
  };

  /*
   * Function to open/close add mail modal
   * */
  const toggleAddMailModal = () => {
    setIsVisibleAddMailModal((prevState: boolean) => !prevState);
  };

  /**
   * Set token in token context
   */
  useEffect(() => {
    // if cookies does not contain sessionToken prop and the user is not in pre login page (where token still has to be set),
    // it means the token has expired and browser deleted it -> redirect user to login
    // TODO: when available, show logout modal (tracked in story https://www.pivotaltracker.com/story/show/169033467)
    const isTokenExpired =
      !cookies.sessionToken &&
      location.pathname !== "/spid-login" &&
      getConfig("IO_ONBOARDING_PA_IS_MOCK_ENV") !== "1";
    if (isTokenExpired) {
      props.history.push("/home");
    }
    alert.alerts.forEach(alertItem => alert.remove(alertItem));
  }, [location.pathname]);

  useEffect(() => {
    // make api call only after onMount because token is string in any case, no longer undefined, and only if userProfile is not set and user is not on spid login page
    const isTokenValidAndUserProfileUnset =
      (getConfig("IO_ONBOARDING_PA_IS_MOCK_ENV") === "1" ||
        NonEmptyString.is(cookies.sessionToken)) &&
      !NonEmptyString.is(userProfile.given_name) &&
      location.pathname !== "/spid-login";
    if (isTokenValidAndUserProfileUnset) {
      baseUrlBackendClient(cookies.sessionToken)
        .getProfile({})
        .then(response => {
          if (response.isRight()) {
            const respValue = response.value;
            if (respValue.status === 200) {
              const userProfileResp = respValue.value;
              handleGetUserProfile(userProfileResp);
              fromNullable(userProfileResp.work_email).foldL(
                toggleAddMailModal,
                constant
              );
            } else {
              const alertText =
                t(`common.errors.getUserProfile.${respValue.status}`) ||
                t(`common.errors.genericError.${respValue.status}`);
              manageErrorReturnCodes(
                respValue.status,
                () => alert.error(alertText),
                () =>
                  logoutModalContext.setLogoutModal({
                    isFromExpiredToken: true,
                    isLogoutModalVisible: true
                  })
              );
            }
          } else {
            // tslint:disable-next-line:no-console
            console.log(response.value.map(v => v.message).join(" - "));
            alert.error(t("common.errors.genericError.500"));
          }
        })
        .catch((error: Error) => {
          // tslint:disable-next-line:no-console
          console.log(error);
          alert.error(t("common.errors.genericError.500"));
        });
    }
  }, [cookies.sessionToken]);

  const navigateToRegistration = (registrationProps: RouteComponentProps) => (
    <RegistrationContainer
      {...registrationProps}
      userFiscalCode={userProfile.fiscal_code}
    />
  );

  const navigateToUserProfile = (userProfileProps: RouteComponentProps) => (
    <UserProfileComponent
      {...userProfileProps}
      userProfile={userProfile}
      toggleAddMailModal={toggleAddMailModal}
    />
  );

  const navigateToDashboard = (dashboardProps: RouteComponentProps) => (
    <Dashboard {...dashboardProps} userProfile={userProfile} />
  );

  return (
    <LogoutModalContextProvider>
      <div className="DefaultContainer">
        {!loadingPageContext.loadingPage.isVisible ? (
          <Fragment>
            <SlimHeader />
            <CentralHeader
              userName={`${userProfile.given_name} ${userProfile.family_name}`}
              userRole={userProfile.role}
            />
          </Fragment>
        ) : null}
        <div>
          <Route path="/spid-login" component={SpidLogin} />
          <Route
            path="/sign-up/:signUpStep"
            exact={true}
            render={navigateToRegistration}
          />
          <Route path="/dashboard" render={navigateToDashboard} />
          <Route path="/profile" render={navigateToUserProfile} />
        </div>
        <AddMailModal
          isVisibleAddMailModal={isVisibleAddMailModal}
          toggleAddMailModal={toggleAddMailModal}
          spidMail={userProfile.email}
          workMail={userProfile.work_email}
          onWorkMailSet={handleWorkMailSet}
        />
        <LogoutModal />
        {loadingPageContext.loadingPage.isVisible ? <LoadingPage /> : null}
      </div>
    </LogoutModalContextProvider>
  );
});
