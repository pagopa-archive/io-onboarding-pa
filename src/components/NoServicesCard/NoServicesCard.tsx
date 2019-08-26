import React, { FC } from "react";
import { Card, CardBody } from "reactstrap";

import "./NoServicesCard.css";

export const NoServicesCard: FC = () => {
  return (
    <div className="NoServicesCard h-100">
      <Card className="pr-1 h-100 no-services-card">
        <CardBody>Non sono ancora presenti servizi di questo tipo</CardBody>
      </Card>
    </div>
  );
};
