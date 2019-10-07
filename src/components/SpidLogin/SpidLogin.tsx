import React from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";
import { SpidLoginButton } from "./SpidLoginButton/SpidLoginButton";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

import "./SpidLogin.css";

/**
 * Component for spid login for delegate
 */
export const SpidLogin = withRouter(props => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <div className="SpidLogin">
      <Container fluid>
        <Row>
          <Col sm="2">
            <Row>
              <Col>
                <Button
                  color="link"
                  className="btn-icon mt-4 pt-3 pl-4"
                  onClick={() => {
                    return props.history.push("/home");
                  }}
                >
                  <svg className="icon icon-primary">
                    <use
                      xlinkHref={`${bootstrapItaliaImages}#it-chevron-left`}
                    />
                  </svg>
                  <span>{t("spidLogin.back")}</span>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm="8">
            <div className="card-wrapper card-space mt-4 pt-3">
              <Card className="card-bg card-big">
                <CardBody>
                  <CardTitle>
                    <h2 className="pb-4">{t("spidLogin.title")}</h2>
                  </CardTitle>
                  <Row>
                    <Col sm="9 card-text">
                      <p className="font-weight-bold mb-0">
                        {t("spidLogin.description.title")}
                      </p>
                      <p>{t("spidLogin.description.text")}</p>
                      <p className="font-weight-bold mb-0">
                        {t("spidLogin.alreadyHasSpid.title")}
                      </p>
                      <p>{t("spidLogin.alreadyHasSpid.text")}</p>
                      <p className="font-weight-bold mb-1">
                        {t("spidLogin.noSpid.title")}
                      </p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.spid.gov.it/richiedi-spid"
                        className="btn btn-link mb-4 pl-0"
                      >
                        {t("spidLogin.noSpid.title")}
                      </a>
                      <p className="font-weight-bold mb-0">
                        {t("spidLogin.whatIsFor.title")}
                      </p>
                      <p className="mb-1">{t("spidLogin.whatIsFor.text")}</p>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.spid.gov.it"
                        className="btn btn-link pl-0"
                        role="button"
                      >
                        {t("spidLogin.moreInfo")}
                      </a>
                    </Col>
                    <Col sm="3">
                      <SpidLoginButton />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
          <div className="col-2 pl-3 pr-3">
            <p className="card-text mt-4 pt-3 small">
              {t("spidLogin.wrongLogin")}
            </p>
            <a
              className="btn btn-outline-primary"
              role="button"
              onClick={() => {
                return props.history.push("/home");
              }}
            >
              {t("spidLogin.backHome")}
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
});
