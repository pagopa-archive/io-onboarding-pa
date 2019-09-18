import React from "react";
import { withRouter } from "react-router";
import { Button, Col, Row } from "reactstrap";

/**
 * Component for delegate dashboard
 */
export const DelegateDashboard = withRouter(props => {
  return (
    <div className="Dashboard">
      <Row>
        <Col className="text-center">
          <Button
            color="danger"
            onClick={() => {
              return props.history.push("sign-up/1");
            }}
          >
            DUMMY BUTTON REGISTRATION
          </Button>
        </Col>
      </Row>
    </div>
  );
});
