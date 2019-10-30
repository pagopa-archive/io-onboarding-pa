import React, { MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";

import { Button, ButtonGroup, Col, Row } from "reactstrap";

import "./RegistrationStepButtons.css";

import { BackButton } from "../../BackButton/BackButton";

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
     * react-i18next translation hook
     */
    const { t } = useTranslation();

    /**
     * Function to go to selected registration step or open modal to return to Dashboard if at step 0
     */
    const goToRegistrationStep = (signUpStep: number) => (_: MouseEvent) => {
      return signUpStep === 0
        ? props.openConfirmModal()
        : props.history.push("/sign-up/" + signUpStep.toString());
    };

    /**
     * Define button class checking if it is relative to current step or future step
     */
    const buttonClass = (el: number) =>
      (el.toString() === props.match.params.signUpStep
        ? "btn-link"
        : ""
      ).concat(
        el >= parseInt(props.match.params.signUpStep, 10) ? " step-button" : ""
      );

    /**
     * Create three button elements with step numbers from 1 to 3
     * current step is highlighted with class btn-link
     * previous step buttons can be clicked to go to selected step
     */
    const stepButtons = [...Array(4).keys()].slice(1).map(el => (
      <Button
        color="secondary"
        outline={true}
        size="xs"
        key={el}
        type="button"
        onClick={goToRegistrationStep(el)}
        className={buttonClass(el)}
      >
        {el}
      </Button>
    ));

    const previousStep = parseInt(props.match.params.signUpStep, 10) - 1;

    return (
      <Col className="RegistrationStepButtons pl-4">
        <Row>
          <Col>
            <BackButton
              path={
                previousStep === 0 ? "/dashboard" : `/sign-up/${previousStep}`
              }
              text={t("common.buttons.back")}
              additionalClasses={"mt-5 pl-0"}
            />
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
