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
export const CentralHeader = withRouter<
  ICentralHeaderProps,
  React.FC<ICentralHeaderProps>
>((props: ICentralHeaderProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <AppHeader
      fixed
      className="CentralHeader it-header-center-wrapper border-bottom-0 w-100"
    >
      <div className="w-100">
        <Container fluid>
          <Row className="align-items-center">
            <Col sm="2" className="text-right">
              <Media
                object
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
                {props.userName !== "" ? (
                  <Fragment>
                    <Col sm="2">
                      <svg className="icon icon-white">
                        <use xlinkHref={`${bootstrapItaliaImages}#it-user`} />
                      </svg>
                    </Col>
                    <Col sm="10">
                      <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav direction="down">
                          <DropdownToggle nav className="text-white pb-0">
                            <Row>
                              <Col sm="auto">
                                <p className="mb-0">{props.userName}</p>
                              </Col>
                              <Col sm="auto">
                                {props.userRole !== "" ? (
                                  <Badge color="white">{props.userRole}</Badge>
                                ) : null}
                              </Col>
                            </Row>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              onClick={() => props.history.push("/profile")}
                            >
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
                ) : null}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </AppHeader>
  );
});
