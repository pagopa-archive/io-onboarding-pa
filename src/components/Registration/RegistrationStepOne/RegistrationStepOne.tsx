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
  isAdministrationAlreadyRegistered: boolean;
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
        return (
          <FormGroup check={true} className="radio" key={key}>
            <Input
              className="form-check-input"
              type="radio"
              id={`radio-pec-${key}`}
              name="selectedPecLabel"
              value={key}
              checked={props.selectedAdministration.selected_pec_label === key}
              onChange={onPecCheckboxChange}
              disabled={props.isAdministrationAlreadyRegistered}
            />
            <Label
              check={true}
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
        <FormGroup check={true} className="radio" key={scope.value}>
          <Input
            className="form-check-input"
            type="radio"
            id={`radio-${scope.value}`}
            name="scope"
            value={scope.value}
            checked={props.selectedAdministration.scope === scope.value}
            onChange={onScopeCheckboxChange}
            disabled={props.isAdministrationAlreadyRegistered}
          />
          <Label
            check={true}
            className="form-check-label"
            htmlFor={`radio-${scope.value}`}
          >
            {scope.label}
          </Label>
        </FormGroup>
      );
    });

    const goToSignUpStepTwo = () => props.history.push("/sign-up/2");

    return (
      <div className="RegistrationStepOne">
        <Container fluid={true}>
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
                        <FormGroup row={true}>
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
                              readOnly={true}
                              value={props.selectedAdministration.fiscal_code}
                            />
                            <FormText color="muted">
                              {t("signUp.stepOne.inputs.precompiledLabel")}
                            </FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row={true}>
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
                              readOnly={true}
                              value={props.selectedAdministration.name}
                            />
                            <FormText color="muted">
                              {t("signUp.stepOne.inputs.precompiledLabel")}
                            </FormText>
                          </Col>
                        </FormGroup>
                        <FormGroup row={true}>
                          <Col sm="4">
                            <Label htmlFor="text-input">
                              {t("signUp.stepOne.inputs.pecLabel")}
                            </Label>
                          </Col>
                          <Col sm="8">{pecRadioButtons}</Col>
                        </FormGroup>
                        <FormGroup row={true} className="mb-5">
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
                            outline={true}
                            color="secondary"
                            className="w-50"
                            onClick={props.openConfirmModal}
                          >
                            {t("common.buttons.cancel")}
                          </Button>
                        </Col>
                        <Col size={6} className="text-right">
                          <Button
                            color="primary"
                            className="w-50"
                            onClick={goToSignUpStepTwo}
                            disabled={
                              !props.selectedAdministration.name ||
                              props.selectedAdministration
                                .selected_pec_label === null ||
                              !props.selectedAdministration.scope
                            }
                          >
                            {t("common.buttons.confirm")}
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
                object={true}
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
