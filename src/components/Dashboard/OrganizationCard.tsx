import React from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import { Organization } from "../../../generated/definitions/api/Organization";
import { OrganizationRegistrationStatusEnum } from "../../../generated/definitions/api/OrganizationRegistrationStatus";

interface IOrganizationCardProps {
  userOrganizations: ReadonlyArray<Organization>;
}

const OrganizationCardImageSection = () => {
  return <div>Image Section</div>;
};

const OrganizationCardInfoSection = () => {
  return <div>Info Section</div>;
};

const OrganizationCardIcon = () => {
  return <div>Icon Section</div>;
};

export const OrganizationCard = (props: IOrganizationCardProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const hasUserOrganizations = props.userOrganizations.length > 0;
  const isUserOrganizationStatusDraft =
    hasUserOrganizations &&
    props.userOrganizations[0].registration_status ===
      OrganizationRegistrationStatusEnum.DRAFT;

  return (
    <div className="InstitutionCard card-wrapper card-space">
      <Card className="card-bg card-big">
        <CardBody>
          <Row>
            {hasUserOrganizations ? (
              <Col sm={2}>
                <OrganizationCardImageSection />
              </Col>
            ) : null}
            <Col sm={!hasUserOrganizations ? 10 : 8}>
              <OrganizationCardInfoSection />
            </Col>
            <Col>
              <OrganizationCardIcon />
            </Col>
          </Row>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};
