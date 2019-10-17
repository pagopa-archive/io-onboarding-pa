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

import { OrganizationScope } from "../../../../generated/definitions/api/OrganizationScope";

import { SearchAdministrations } from "./SearchAdministrations";

import logoSignupStepOne from "../../../assets/img/signup_step1.svg";

interface IRegistrationStepOneProps
  extends ComponentProps<typeof SearchAdministrations>,
    RouteComponentProps<{ registrationStep: string }> {
  onPecCheckboxChange: (selectedPecLabel: string) => void;
  onScopeCheckboxChange: (selectedScope: OrganizationScope) => void;
  openConfirmModal: () => void;
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
      props.onPecCheckboxChange(event.target.value);
    };

    /**
     * Function called when scope checkbox is clicked
     */
    const onScopeCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      props.onScopeCheckboxChange(event.target.value as OrganizationScope);
    };
    const pecRadioButtons = Object.keys(props.selectedAdministration.pecs).map(
      key => {
        console.log(props.selectedAdministration, props.selectedAdministration.selectedPecLabel, key, props.selectedAdministration.selectedPecLabel === key)
        return (
          <FormGroup check className="radio" key={key}>
            <Input
              className="form-check-input"
              type="radio"
              id={`radio-pec-${key}`}
              name="selectedPecIndex"
              value={key}
              checked={props.selectedAdministration.selectedPecLabel === key}
              onChange={onPecCheckboxChange}
            />
            <Label
              check
              className="form-check-label"
              htmlFor={`radio-pec-${key}`}
            >
              {props.selectedAdministration.pecs[key]}
            </Label>
          </FormGroup>
        );
      }
    );

    const administrationScopes: ReadonlyArray<{
      label: string;
      value: string;
    }> = [
      { label: t("signUp.stepOne.scopeRadio.localLabel"), value: "LOCAL" },
      { label: t("signUp.stepOne.scopeRadio.nationalLabel"), value: "NATIONAL" }
    ];

    const scopeRadioButtons = administrationScopes.map(scope => {
      return (
        <FormGroup check className="radio" key={scope.value}>
          <Input
            className="form-check-input"
            type="radio"
            id={`radio-${scope.value}`}
            name="scope"
            value={scope.value}
            checked={props.selectedAdministration.scope === scope.value}
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
                  <h1 className="mt-5">{t("signUp.stepOne.title")}</h1>
                  <p className="mt-4">{t("signUp.stepOne.description")}</p>
                  <Row className="mt-5">
                    <Col>
                      <SearchAdministrations
                        administrations={props.administrations}
                        onAdministrationSearch={props.onAdministrationSearch}
                        onAdministrationSelected={
                          props.onAdministrationSelected
                        }
                        selectedAdministration={props.selectedAdministration}
                      />
                      <Form
                        action=""
                        method="post"
                        encType="multipart/form-data"
                        className="form-horizontal w-100 mt-5"
                      >
                        <FormGroup row>
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
                              value={
                                props.selectedAdministration.fiscal_code || ""
                              }
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
                              value={props.selectedAdministration.name || ""}
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
                        <FormGroup row className="mb-5">
                          <Col sm="4">
                            <Label htmlFor="text-input">
                              {t("signUp.stepOne.inputs.scopeLabel")}
                            </Label>
                          </Col>
                          <Col sm="8">{scopeRadioButtons}</Col>
                        </FormGroup>
                      </Form>
                      <Row className="pb-5">
                        <Col size={6} className="text-left">
                          <Button
                            outline
                            color="secondary"
                            className="w-50"
                            onClick={props.openConfirmModal}
                          >
                            {t("signUp.stepOne.leftButton")}
                          </Button>
                        </Col>
                        <Col size={6} className="text-right">
                          <Button
                            color="primary"
                            className="w-50"
                            onClick={() => props.history.push("/sign-up/2")}
                            disabled={
                              !props.selectedAdministration.name ||
                              props.selectedAdministration.selectedPecLabel ===
                                null ||
                              !props.selectedAdministration.scope
                            }
                          >
                            {t("signUp.stepOne.rightButton")}
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
                className="pt-5 w-75"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
