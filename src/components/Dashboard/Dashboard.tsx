import React from "react";
import { withRouter } from "react-router";
import { Button, Col, Row } from "reactstrap";

/**
 * Component for delegate dashboard
 */
export const Dashboard = withRouter(props => {
  /**
   * Navigate to signup page
   */
  const navigateToSignUpStepOne = () => props.history.push("sign-up/1");

  return (
    <div className="Dashboard">
      <Row>
        <Col className="text-center">
          <Button color="danger" onClick={navigateToSignUpStepOne}>
            DUMMY BUTTON REGISTRATION
          </Button>
        </Col>
      </Row>
    </div>
  );
});
