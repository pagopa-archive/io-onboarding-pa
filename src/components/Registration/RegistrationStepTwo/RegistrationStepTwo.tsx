import { NonEmptyString } from "italia-ts-commons/lib/strings";
import React, { ChangeEvent, ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Row
} from "reactstrap";
import { FiscalCode } from "../../../../generated/definitions/api/FiscalCode";
import { OrganizationRegistrationParams } from "../../../../generated/definitions/api/OrganizationRegistrationParams";
import { OrganizationScopeEnum } from "../../../../generated/definitions/api/OrganizationScope";
import logoSignupStepTwoNew from "../../../assets/img/signup_step2_new.svg";
import { SearchAdministrations } from "../RegistrationStepOne/SearchAdministrations";

interface IRegistrationStepTwoProps {
  selectedAdministration: ComponentProps<
    typeof SearchAdministrations
  >["selectedAdministration"];
  onStepTwoInputChange: (inputName: string, inputValue: string) => void;
  onSaveAdministration: (
    administrationToSave: OrganizationRegistrationParams
  ) => void;
}

/**
 * Component for second step of registration process
 */
export const RegistrationStepTwo = (props: IRegistrationStepTwoProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const onStepTwoInputChange = (inputName: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    props.onStepTwoInputChange(inputName, event.target.value);
  };

  const saveAdministration = () => {
    const administrationToSaveParams: OrganizationRegistrationParams = {
      ipa_code: props.selectedAdministration.ipa_code as NonEmptyString,
      legal_representative: {
        family_name: props.selectedAdministration.legal_representative
          .family_name as NonEmptyString,
        fiscal_code: props.selectedAdministration.legal_representative
          .fiscal_code as FiscalCode,
        given_name: props.selectedAdministration.legal_representative
          .given_name as NonEmptyString,
        phone_number: props.selectedAdministration.legal_representative
          .phone_number as NonEmptyString
      },
      scope: props.selectedAdministration.scope as OrganizationScopeEnum,
      selected_pec_label: props.selectedAdministration
        .selected_pec_label as NonEmptyString
    };
    props.onSaveAdministration(administrationToSaveParams);
  };

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
                            name="given_name"
                            placeholder=""
                            value={
                              props.selectedAdministration.legal_representative
                                .given_name
                            }
                            onChange={onStepTwoInputChange("given_name")}
                          />
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="family_name-input" className="active">
                            {t("signUp.stepTwo.inputs.surnameLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="family_name-input"
                            name="family_name"
                            placeholder=""
                            value={
                              props.selectedAdministration.legal_representative
                                .family_name
                            }
                            onChange={onStepTwoInputChange("family_name")}
                          />
                        </Col>
                      </FormGroup>
                      <p className="pt-3 mb-5">
                        {t("signUp.stepTwo.legalRep.disclaimer")}&nbsp;
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="http://www.indicepa.gov.it"
                        >
                          www.indicepa.gov.it
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
                            name="fiscal_code"
                            placeholder={t(
                              "signUp.stepTwo.inputs.fcPlaceholder"
                            )}
                            value={
                              props.selectedAdministration.legal_representative
                                .fiscal_code || ""
                            }
                            onChange={onStepTwoInputChange("fiscal_code")}
                          />
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
                            name="phone_number"
                            placeholder={t(
                              "signUp.stepTwo.inputs.phonePlaceholder"
                            )}
                            value={
                              props.selectedAdministration.legal_representative
                                .phone_number || ""
                            }
                            onChange={onStepTwoInputChange("phone_number")}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row className="pb-5 pb-5">
                      <Col size={6} className="text-left">
                        <Button
                          outline={true}
                          color="secondary"
                          className="w-50"
                        >
                          {t("common.buttons.cancel")}
                        </Button>
                      </Col>
                      <Col size={6} className="text-right">
                        <Button
                          color="primary"
                          className="w-50"
                          // TODO: add function to call API to save administration and to go to next step when available, see https://www.pivotaltracker.com/story/show/168752341
                          onClick={saveAdministration}
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
