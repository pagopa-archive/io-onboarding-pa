import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

import { Button, ButtonGroup, Col, Row } from "reactstrap";

import "./RegistrationStepButtons.css";

import bootstrapItaliaImages from "../../../assets/img/bootstrap-italia/sprite.svg";

interface IRegistrationStepButtonsProps
  extends RouteComponentProps<{ signUpStep: string }> {
  openConfirmModal: () => void;
}

/**
 * Component for navigation through registration steps
 */
export const RegistrationStepButtons = withRouter(
  (props: IRegistrationStepButtonsProps) => {
    /**
     * Function to go to selected registration step or open modal to return to Dashboard if at step 0
     */
    const goToRegistrationStep = (signUpStep: number) => {
      return signUpStep === 0
        ? props.openConfirmModal()
        : props.history.push("/sign-up/" + signUpStep);
    };

    /**
     * Create three button elements with step numbers from 1 to 3
     * current step is highlighted with class btn-link
     * previous step buttons can be clicked to go to selected step
     */
    const stepButtons = [...Array(4).keys()].slice(1).map(el => (
      <Button
        color="secondary"
        outline
        size="xs"
        key={el}
        type="button"
        onClick={() => goToRegistrationStep(el)}
        className={`
      ${el.toString() === props.match.params.signUpStep ? "btn-link" : ""}
      ${el >= parseInt(props.match.params.signUpStep, 10) ? "step-button" : ""}
      `}
      >
        {el}
      </Button>
    ));

    return (
      <Col className="RegistrationStepButtons pl-4">
        <Row>
          <Col>
            <Button
              color="link"
              className="btn-icon mt-5 pl-0"
              onClick={() =>
                goToRegistrationStep(
                  parseInt(props.match.params.signUpStep, 10) - 1
                )
              }
            >
              <svg className="icon icon-primary">
                <use xlinkHref={`${bootstrapItaliaImages}#it-chevron-left`} />
              </svg>
              <span>Torna indietro</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonGroup>{stepButtons}</ButtonGroup>
          </Col>
        </Row>
      </Col>
    );
  }
);
