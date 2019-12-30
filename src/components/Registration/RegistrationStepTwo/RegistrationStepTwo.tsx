import { exact } from "io-ts";
import React, { ComponentProps } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Media,
  Row
} from "reactstrap";

import { FiscalCode } from "../../../../generated/definitions/api/FiscalCode";
import { OrganizationRegistrationParams } from "../../../../generated/definitions/api/OrganizationRegistrationParams";
import logoSignupStepTwoNew from "../../../assets/img/signup_step2_new.svg";
import { SearchAdministrations } from "../RegistrationStepOne/SearchAdministrations";

interface IRegistrationStepTwoProps {
  selectedAdministration: ComponentProps<
    typeof SearchAdministrations
  >["selectedAdministration"];
  onSaveAdministration: (
    administrationToSave: OrganizationRegistrationParams
  ) => void;
  openConfirmModal: () => void;
  onRegistrationStepTwoSubmit: (formData: IRegistrationStepTwoFormData) => void;
}

// Types for form input
interface IRegistrationStepTwoFormData {
  givenName: string;
  familyName: string;
  fc: FiscalCode;
  phoneNumber: string;
}

/**
 * Component for second step of registration process
 */
export const RegistrationStepTwo = (props: IRegistrationStepTwoProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const alert = useAlert();

  const { register, handleSubmit, errors } = useForm<
    IRegistrationStepTwoFormData
  >();

  const requiredInputErrorText = `${t("common.inputs.errors.requiredField")}`;

  const saveAdministration = (formData: IRegistrationStepTwoFormData) => {
    OrganizationRegistrationParams.decode({
      ...props.selectedAdministration,
      legal_representative: {
        ...props.selectedAdministration.legal_representative,
        family_name: formData.familyName,
        fiscal_code: formData.fc,
        given_name: formData.givenName,
        phone_number: formData.phoneNumber
      }
    }).fold(
      _ => {
        alert.error(t("common.alerts.registrationWrongData"));
      },
      rightResult => {
        props.onSaveAdministration(
          exact(OrganizationRegistrationParams).encode(rightResult)
        );
      }
    );
  };

  const onRegistrationStepTwoSubmit = handleSubmit(formData => {
    props.onRegistrationStepTwoSubmit(formData);
    return saveAdministration(formData);
  });

  return (
    <div className="RegistrationStepTwo">
      <Container fluid={true}>
        <Row>
          <Col sm="10">
            <Row>
              <Col sm="11">
                <h1 className="pt-5">{t("signUp.stepTwo.title")}</h1>
                <Row className="pt-3">
                  <Col>
                    <p>{t("signUp.stepTwo.description")}</p>
                    <Form
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      className="form-horizontal w-100 pt-4"
                    >
                      <h3>{t("signUp.stepTwo.legalRep.title")}</h3>
                      <p className="pt-2">
                        {t("signUp.stepTwo.legalRep.description")}
                      </p>
                      <FormGroup row={true} className="pt-4 mb-4">
                        <Col sm="6">
                          <Label htmlFor="given_name-input" className="active">
                            {t("signUp.stepTwo.inputs.nameLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="given_name-input"
                            name="givenName"
                            placeholder=""
                            innerRef={register({
                              required: requiredInputErrorText
                            })}
                            invalid={errors.givenName !== undefined}
                            defaultValue={
                              props.selectedAdministration.legal_representative
                                .given_name
                            }
                          />
                          <FormFeedback>
                            {errors.givenName && errors.givenName.message}
                          </FormFeedback>
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="family_name-input" className="active">
                            {t("signUp.stepTwo.inputs.surnameLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="family_name-input"
                            name="familyName"
                            placeholder=""
                            innerRef={register({
                              required: requiredInputErrorText
                            })}
                            invalid={errors.familyName !== undefined}
                            defaultValue={
                              props.selectedAdministration.legal_representative
                                .family_name
                            }
                          />
                          <FormFeedback>
                            {errors.familyName && errors.familyName.message}
                          </FormFeedback>
                        </Col>
                      </FormGroup>
                      <p className="pt-3 mb-5">
                        {t("signUp.stepTwo.legalRep.disclaimer")}&nbsp;
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={t("common.links.ipa.link")}
                        >
                          {t("common.links.ipa.textLink")}
                        </a>
                      </p>
                      <FormGroup row={true} className="pt-4">
                        <Col sm="6">
                          <Label htmlFor="fiscal_code-input" className="active">
                            {t("signUp.stepTwo.inputs.fcLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="fiscal_code-input"
                            name="fc"
                            placeholder={t(
                              "signUp.stepTwo.inputs.fcPlaceholder"
                            )}
                            innerRef={register({
                              required: requiredInputErrorText,
                              validate: {
                                isUpperCase: value =>
                                  value.toUpperCase() === value ||
                                  `${t(
                                    "common.inputs.errors.lowerCaseFiscalCode"
                                  )}`,
                                isValidFiscalCode: value =>
                                  FiscalCode.is(value) ||
                                  `${t(
                                    "common.inputs.errors.invalidFiscalCode"
                                  )}`
                              }
                            })}
                            invalid={errors.fc !== undefined}
                            defaultValue={
                              props.selectedAdministration.legal_representative
                                .fiscal_code
                            }
                          />
                          {errors && errors.fc && (
                            <FormFeedback>{errors.fc.message}</FormFeedback>
                          )}
                        </Col>
                        <Col sm="6">
                          <Label
                            htmlFor="phone_number-input"
                            className="active"
                          >
                            {t("signUp.stepTwo.inputs.phoneLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="phone_number-input"
                            name="phoneNumber"
                            placeholder={t(
                              "signUp.stepTwo.inputs.phonePlaceholder"
                            )}
                            innerRef={register({
                              required: requiredInputErrorText
                            })}
                            invalid={errors.phoneNumber !== undefined}
                            defaultValue={
                              props.selectedAdministration.legal_representative
                                .phone_number
                            }
                          />
                          <FormFeedback>
                            {errors.phoneNumber && errors.phoneNumber.message}
                          </FormFeedback>
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row className="pb-5 pb-5">
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
                          onClick={onRegistrationStepTwoSubmit}
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
              src={logoSignupStepTwoNew}
              alt="Signup step one logo"
              className="pt-5 w-75"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
