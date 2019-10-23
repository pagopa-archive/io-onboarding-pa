import { AppHeader } from "@coreui/react";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { UserRoleEnum } from "../../../generated/definitions/api/UserRole";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";
import ioLogoWhite from "../../assets/img/io-logo-white.svg";

import "./CentralHeader.css";

/**
 * Props for central header
 */
interface ICentralHeaderProps extends RouteComponentProps {
  userName: string;
  userRole: string;
}

/**
 * Central header right below Slim header, containing app title and user name and user role with dropdown to go to profile page and logout
 */
export const CentralHeader = withRouter((props: ICentralHeaderProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  /**
   * add user icon if user name is set
   */
  const userIcon =
    props.userName !== "" && props.userName !== " " ? (
      <svg className="icon icon-white">
        <use xlinkHref={`${bootstrapItaliaImages}#it-user`} />
      </svg>
    ) : null;

  /**
   * switch from user role enum to string
   */
  const userRole = (userRoleEnum => {
    switch (userRoleEnum) {
      case UserRoleEnum.ORG_DELEGATE:
        return t("centralHeader.userBadge.delegate");
      case UserRoleEnum.DEVELOPER:
        return t("centralHeader.userBadge.developer");
      case UserRoleEnum.ORG_MANAGER:
        return t("centralHeader.userBadge.legalRep");
      case UserRoleEnum.ADMIN:
        return t("centralHeader.userBadge.admin");
    }
  })(props.userRole);
  /**
   * create badge for user role if user role is set
   */
  const userRoleBadge =
    props.userRole !== "" ? <Badge color="white">{userRole}</Badge> : null;

  /**
   * function to navigate to profile
   */
  const navigateToProfile = () => props.history.push("/profile");

  /**
   * create username with dropdown menu if user is set
   */
  const userNameWithDropdown =
    props.userName !== "" ? (
      <Fragment>
        <Col sm="2" className="pr-0">
          {userIcon}
        </Col>
        <Col sm="10" className="pl-0">
          <Nav className="ml-auto" navbar={true}>
            <UncontrolledDropdown nav={true} direction="down">
              <DropdownToggle nav={true} className="text-white pb-0">
                <Row>
                  <Col sm="auto">
                    <p className="mb-0">{props.userName}</p>
                  </Col>
                  <Col sm="auto">{userRoleBadge}</Col>
                </Row>
              </DropdownToggle>
              <DropdownMenu right={true}>
                <DropdownItem onClick={navigateToProfile}>
                  {t("centralHeader.userMenu.profile")}
                </DropdownItem>
                {/*TODO: add logout function*/}
                <DropdownItem>
                  {t("centralHeader.userMenu.logout")}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Col>
      </Fragment>
    ) : null;

  return (
    <AppHeader
      fixed={true}
      className="CentralHeader it-header-center-wrapper border-bottom-0 w-100"
    >
      <div className="w-100">
        <Container fluid={true}>
          <Row className="align-items-center">
            <Col sm="2" className="text-right">
              <Media
                object={true}
                src={ioLogoWhite}
                alt="Io Logo"
                width="64"
                height="52"
              />
            </Col>
            <Col sm="8">
              <Row className="text-white">
                <Col sm="auto" className="ml-2">
                  <Row>
                    <Col>
                      <h4 className="font-weight-bold mb-0">
                        {t("centralHeader.title")}
                      </h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="mb-0">{t("centralHeader.subtitle")}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm="2" className="text-white">
              <Row className="h-100 align-items-end">
                {userNameWithDropdown}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </AppHeader>
  );
});
