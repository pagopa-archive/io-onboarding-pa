import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Col, Container, Row } from "reactstrap";

import { useTranslation } from "react-i18next";
import { UserProfile } from "../../../generated/definitions/api/UserProfile";
import { UserRoleEnum } from "../../../generated/definitions/api/UserRole";
import { InstitutionCard } from "./InstitutionCard";

import { useCookies } from "react-cookie";
import { Organization } from "../../../generated/definitions/api/Organization";
import { AlertContext } from "../../context/alert-context";
import { LogoutModalContext } from "../../context/logout-modal-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../utils/api-utils";
import "./Dashboard.css";

interface IInstitutionRowProps {
  userOrganizations: ReadonlyArray<Organization>;
}

const InstitutionsRow = (props: IInstitutionRowProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <Row className="pt-5">
      <Col className="info-column">
        <Row>
          <Col>
            <p className="px-2">
              {t("dashboard.infoColumn.institutionRow.title")}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="small px-2">
              {t("dashboard.infoColumn.institutionRow.text")}
            </p>
            <p className="small px-2">
              {t("common.links.pagopa.text")}&nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.indicepa.gov.it"
              >
                {t("common.links.pagopa.link")}
              </a>
            </p>
          </Col>
        </Row>
      </Col>
      <Col className="main-column">
        <div className="ml-2">
          <InstitutionCard userOrganizations={props.userOrganizations} />
        </div>
      </Col>
    </Row>
  );
};

interface IDashboardProps extends RouteComponentProps {
  userProfile: UserProfile;
}

/**
 * Component for delegate dashboard
 */
export const Dashboard = withRouter((props: IDashboardProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const alertContext = useContext(AlertContext);
  const showGenericErrorAlert = () => {
    alertContext.setAlert({
      alertColor: "danger",
      alertText: t("common.errors.genericError.500"),
      showAlert: true
    });
  };
  const logoutModalContext = useContext(LogoutModalContext);

  const [userOrganizations, setUserOrganizations] = useState<
    ReadonlyArray<Organization>
  >([]);

  const [cookies] = useCookies(["sessionToken"]);

  useEffect(() => {
    baseUrlBackendClient(cookies.sessionToken)
      .getOrganizations({})
      .then(response => {
        if (response.isRight()) {
          const respValue = response.value;
          if (respValue.status === 200) {
            const getOrganizationsResp = respValue.value;
            setUserOrganizations(getOrganizationsResp.items);
          } else {
            const alertText =
              t(`common.errors.getOrganizations.${respValue.status}`) ||
              t(`common.errors.genericError.${respValue.status}`);
            manageErrorReturnCodes(
              respValue.status,
              () =>
                alertContext.setAlert({
                  alertColor: "danger",
                  alertText,
                  showAlert: true
                }),
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
          showGenericErrorAlert();
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        showGenericErrorAlert();
      });
  }, []);

  const institutionsSection =
    props.userProfile.role === UserRoleEnum.DEVELOPER ? null : (
      <InstitutionsRow userOrganizations={userOrganizations} />
    );
  /* add services section when get services api is ready - tracked by story https://www.pivotaltracker.com/story/show/169999740*/
  const servicesSection = null;

  return (
    <div className="Dashboard">
      <Container fluid={true}>
        <Row>
          <Col sm={10} className="left-section app-navigation-bar-height">
            {institutionsSection}
            {servicesSection}
          </Col>
          <Col
            sm={{ size: 2, offset: 10 }}
            className="right-section app-navigation-bar-height"
          />
        </Row>
      </Container>
    </div>
  );
});
