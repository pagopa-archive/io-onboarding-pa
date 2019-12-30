import "./Dashboard.css";

import React, { Fragment, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import { Col, Container, Row } from "reactstrap";

import { Organization } from "../../../generated/definitions/api/Organization";
import { UserProfile } from "../../../generated/definitions/api/UserProfile";
import { UserRoleEnum } from "../../../generated/definitions/api/UserRole";
import { LogoutModalContext } from "../../context/logout-modal-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../utils/api-utils";
import { OrganizationCard } from "./OrganizationCard";

interface IOrganizationRowProps {
  userOrganizations: ReadonlyArray<Organization>;
}

const OrganizationsRow = (props: IOrganizationRowProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <Fragment>
      <Row className="pt-5 align-items-end">
        <Col className="info-column">
          <p className="px-2 mb-0">
            {t("dashboard.infoColumn.organizationRow.title")}
          </p>
        </Col>
        <Col className="main-column">
          <h1 className="mb-0 ml-2">
            {t("dashboard.mainColumn.organizationRow.title")}
          </h1>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col className="info-column">
          <p className="small px-2">
            {t("dashboard.infoColumn.organizationRow.text")}
          </p>
          <p className="small px-2">
            {t("common.links.ipa.text")}&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={t("common.links.ipa.link")}
            >
              {t("common.links.ipa.textLink")}
            </a>
          </p>
        </Col>
        <Col className="main-column">
          <div className="ml-2 mr-3">
            <OrganizationCard userOrganizations={props.userOrganizations} />
          </div>
        </Col>
      </Row>
    </Fragment>
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

  const alert = useAlert();
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
        console.log(error.message);
        alert.error(t("common.errors.genericError.500"));
      });
  }, []);

  const organizationsSection =
    props.userProfile.role === UserRoleEnum.DEVELOPER ? null : (
      <OrganizationsRow userOrganizations={userOrganizations} />
    );
  /* add services section when get services api is ready - tracked by story https://www.pivotaltracker.com/story/show/169999740*/
  const servicesSection = null;

  return (
    <div className="Dashboard">
      <Container fluid={true}>
        <Row>
          <Col sm={10} className="left-section app-navigation-bar-height">
            {organizationsSection}
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
