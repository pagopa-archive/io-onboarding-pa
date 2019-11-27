import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import { Organization } from "../../../generated/definitions/api/Organization";

interface IInstitutionCardProps {
  userOrganizations: ReadonlyArray<Organization>;
}

export const InstitutionCard = (props: IInstitutionCardProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <Row>
      <Col className="info-column">
        <p>Ciao</p>
      </Col>
    </Row>
  );
};
