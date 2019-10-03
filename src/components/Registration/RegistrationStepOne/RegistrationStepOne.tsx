import React, { ChangeEvent, ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Media,
  Row
} from "reactstrap";

import { SearchInstitutions } from "./SearchInstitutions";

import logoSignupStepOne from "../../../assets/img/signup_step1.svg";

interface IRegistrationStepOneProps
  extends ComponentProps<typeof SearchInstitutions>,
    RouteComponentProps<{ registrationStep: string }> {
  onPecCheckboxChange: (selectedPecIndex: number) => void;
  onScopeCheckboxChange: (selectedScope: string) => void;
}

/**
 * Component for first step of registration process
 */
export const RegistrationStepOne = withRouter(
  (props: IRegistrationStepOneProps) => {
    /**
     * react-i18next translation hook
     */
    const { t } = useTranslation();

    /**
     * Function called when pecs checkbox is clicked
     */
    const onPecCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      props.onPecCheckboxChange(parseInt(event.target.value, 10));
    };

    /**
     * Function called when scope checkbox is clicked
     */
    const onScopeCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      props.onScopeCheckboxChange(event.target.value);
    };

    const pecRadioButtons = props.selectedInstitution.pecs.map(
      (pec, pecIndex) => {
        return (
          <FormGroup check className="radio" key={pecIndex}>
            <Input
              className="form-check-input"
              type="radio"
              id={`radio-${pec}`}
              name="selectedPecIndex"
              value={pecIndex}
              checked={props.selectedInstitution.selectedPecIndex === pecIndex}
              onChange={onPecCheckboxChange}
            />
            <Label check className="form-check-label" htmlFor={`radio-${pec}`}>
              {pec}
            </Label>
          </FormGroup>
        );
      }
    );

    const institutionScopes: ReadonlyArray<{ label: string; value: string }> = [
      { label: t("signUp.stepOne.scopeRadio.localLabel"), value: "LOCAL" },
      { label: t("signUp.stepOne.scopeRadio.nationalLabel"), value: "NATIONAL" }
    ];

    const scopeRadioButtons = institutionScopes.map(scope => {
      return (
        <FormGroup check className="radio" key={scope.value}>
          <Input
            className="form-check-input"
            type="radio"
            id={`radio-${scope.value}`}
            name="scope"
            value={scope.value}
            checked={props.selectedInstitution.scope === scope.value}
            onChange={onScopeCheckboxChange}
          />
          <Label
            check
            className="form-check-label"
            htmlFor={`radio-${scope.value}`}
          >
            {scope.label}
          </Label>
        </FormGroup>
      );
    });

    return (
      <div className="RegistrationStepOne">
        <Container fluid>
          <Row>
            <Col sm="10">
              <Row>
                <Col sm="11">
                  <h1 className="pt-4">{t("signUp.stepOne.title")}</h1>
                  <Row className="pt-4">
                    <Col>
                      <SearchInstitutions
                        institutions={props.institutions}
                        onInstitutionSearch={props.onInstitutionSearch}
                        onInstitutionSelected={props.onInstitutionSelected}
                        selectedInstitution={props.selectedInstitution}
                      />
                      <Form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal w-100 pt-3"
                      >
                        <FormGroup row className="pt-3">
                          <Col sm="4">
                            <Label htmlFor="cf-input">
                              {t("signUp.stepOne.inputs.cfLabel")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <Input
                              type="text"
                              id="cf-input"
                              name="cf-input"
                              placeholder=""
                              readOnly
                              value={props.selectedInstitution.fiscalCode || ""}
                            />
                            <FormText color="muted">
                              {t("signUp.stepOne.inputs.precompiledLabel")}
                            </FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col sm="4">
                            <Label htmlFor="admin-name-input">
                              {t("signUp.stepOne.inputs.administrationLabel")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <Input
                              type="text"
                              id="admin-name-input"
                              name="admin-name-input"
                              placeholder=""
                              readOnly
                              value={props.selectedInstitution.name || ""}
                            />
                            <FormText color="muted">
                              {t("signUp.stepOne.inputs.precompiledLabel")}
                            </FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col sm="4">
                            <Label htmlFor="text-input">
                              {t("signUp.stepOne.inputs.pecLabel")}
                            </Label>
                          </Col>
                          <Col sm="8">{pecRadioButtons}</Col>
                        </FormGroup>
                        <FormGroup row className="mb-4">
                          <Col sm="4">
                            <Label htmlFor="text-input">
                              {t("signUp.stepOne.inputs.scopeLabel")}
                            </Label>
                          </Col>
                          <Col sm="8">{scopeRadioButtons}</Col>
                        </FormGroup>
                      </Form>
                      <Row className="pb-3">
                        <Col size={6} className="text-left">
                          <Button
                            outline
                            color="secondary"
                            className="w-50"
                            onClick={() => props.history.push("/dashboard/")}
                          >
                            {t("signUp.stepOne.inputs.leftButton")}
                          </Button>
                        </Col>
                        <Col size={6} className="text-right">
                          <Button
                            color="primary"
                            className="w-50"
                            onClick={() => props.history.push("/sign-up/2")}
                            disabled={
                              !props.selectedInstitution.name ||
                              props.selectedInstitution.selectedPecIndex ===
                                null ||
                              !props.selectedInstitution.scope
                            }
                          >
                            {t("signUp.stepOne.inputs.rightButton")}
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm="2">
              <Media
                object
                src={logoSignupStepOne}
                alt="Signup step one logo"
                className="pt-3 w-75"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
