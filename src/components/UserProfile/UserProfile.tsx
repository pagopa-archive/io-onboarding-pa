import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";
import { UserProfile as UserProfileType } from "../../../generated/definitions/api/UserProfile";
import { BackButton } from "../BackButton/BackButton";

interface IUserProfileProps {
  userProfile: UserProfileType;
  toggleAddMailModal: () => void;
}

/**
 * Component for delegate dashboard
 */
export const UserProfile = (props: IUserProfileProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <div className="UserProfile container-fluid">
      <Container fluid={true}>
        <Row>
          <Col sm="2">
            <BackButton
              path="/dashboard"
              text={t("common.buttons.backDashboard")}
              additionalClasses={"mt-5 pl-3"}
            />
          </Col>
          <Col sm="8">
            <div className="card-wrapper card-space mt-5 pt-3">
              <Card className="card-bg card-big">
                <CardBody>
                  <CardTitle>
                    <Row>
                      <Col sm="6">
                        <h2 className="pb-4">{t("userProfile.title")}</h2>
                      </Col>
                      <Col sm="6" className="clearfix">
                        <Button
                          color="primary"
                          outline={true}
                          className="float-right"
                        >
                          {/*TODO: add logout function - story https://www.pivotaltracker.com/story/show/169448479*/}
                          {t("common.buttons.logout")}
                        </Button>
                      </Col>
                    </Row>
                  </CardTitle>
                  <Row />
                  <Row>
                    <Col sm="6" className="border-right">
                      <Row>
                        <Col>
                          <p>{t("userProfile.spidInfo.title")}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="font-weight-bold mt-4">
                            {t("userProfile.spidInfo.labels.name")}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            {`${props.userProfile.given_name} ${props.userProfile.family_name}`}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="font-weight-bold mt-4">
                            {t("userProfile.spidInfo.labels.email")}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>{props.userProfile.email}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="font-weight-bold mt-4">
                            {t("userProfile.spidInfo.labels.fc")}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>{props.userProfile.fiscal_code}</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="6" className="pl-5">
                      <Row>
                        <Col>
                          <p>{t("userProfile.optionalInfo.title")}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="font-weight-bold mt-4">
                            {t("userProfile.optionalInfo.labels.workMail")}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            {!props.userProfile.work_email ||
                            props.userProfile.email ===
                              props.userProfile.work_email
                              ? "-"
                              : props.userProfile.work_email}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-4">
                          <Button
                            color="primary"
                            onClick={props.toggleAddMailModal}
                          >
                            {/*TODO: add change mail function - story https://www.pivotaltracker.com/story/show/168752431*/}
                            {!props.userProfile.work_email ||
                            props.userProfile.email ===
                              props.userProfile.work_email
                              ? t("common.buttons.add")
                              : t("common.buttons.change")}
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-4">
                          <p>
                            {!props.userProfile.work_email ||
                            props.userProfile.email ===
                              props.userProfile.work_email
                              ? t(
                                  "userProfile.optionalInfo.noWorkMailDescription"
                                )
                              : t(
                                  "userProfile.optionalInfo.workMailUsageDescription"
                                )}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
