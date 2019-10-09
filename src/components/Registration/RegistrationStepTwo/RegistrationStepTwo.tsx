import React, { ComponentProps } from "react";
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
import logoSignupStepTwoNew from "../../../assets/img/signup_step2_new.svg";
import { SearchInstitutions } from "../RegistrationStepOne/SearchInstitutions";

interface IRegistrationStepTwoProps {
  selectedInstitution: ComponentProps<
    typeof SearchInstitutions
  >["selectedInstitution"];
  onStepTwoInputChange: (inputName: string, inputValue: string) => void;
}

/**
 * Component for second step of registration process
 */
export const RegistrationStepTwo = (props: IRegistrationStepTwoProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  return (
    <div className="RegistrationStepTwo">
      <Container fluid>
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
                      <FormGroup row className="pt-4 mb-4">
                        <Col sm="6">
                          <Label htmlFor="firstName-input" className="active">
                            {t("signUp.stepTwo.inputs.nameLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="firstName-input"
                            name="firstName"
                            placeholder=""
                            value={
                              props.selectedInstitution.legalRepresentative
                                .firstName
                            }
                            onChange={event =>
                              props.onStepTwoInputChange(
                                "firstName",
                                event.target.value
                              )
                            }
                          />
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="surname-input" className="active">
                            {t("signUp.stepTwo.inputs.surnameLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="familyName-input"
                            name="familyName"
                            placeholder=""
                            value={
                              props.selectedInstitution.legalRepresentative
                                .familyName
                            }
                            onChange={event =>
                              props.onStepTwoInputChange(
                                "familyName",
                                event.target.value
                              )
                            }
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
                      <FormGroup row className="pt-4">
                        <Col sm="6">
                          <Label htmlFor="fc-input" className="active">
                            {t("signUp.stepTwo.inputs.fcLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="fiscalCode-input"
                            name="fiscalCode"
                            placeholder={t(
                              "signUp.stepTwo.inputs.fcPlaceholder"
                            )}
                            value={
                              props.selectedInstitution.legalRepresentative
                                .fiscalCode || ""
                            }
                            onChange={event =>
                              props.onStepTwoInputChange(
                                "fiscalCode",
                                event.target.value
                              )
                            }
                          />
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="phone-input" className="active">
                            {t("signUp.stepTwo.inputs.phoneLabel")}
                          </Label>
                          <Input
                            type="text"
                            id="phoneNumber-input"
                            name="phoneNumber"
                            placeholder={t(
                              "signUp.stepTwo.inputs.phonePlaceholder"
                            )}
                            value={
                              props.selectedInstitution.legalRepresentative
                                .phoneNumber || ""
                            }
                            onChange={event =>
                              props.onStepTwoInputChange(
                                "phoneNumber",
                                event.target.value
                              )
                            }
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row className="pb-5 pb-5">
                      <Col size={6} className="text-left">
                        <Button outline color="secondary" className="w-50">
                          {t("signUp.stepTwo.leftButton")}
                        </Button>
                      </Col>
                      <Col size={6} className="text-right">
                        <Button
                          color="primary"
                          className="w-50"
                          // TODO: add function to call API to save institution and to go to next step when available, see https://www.pivotaltracker.com/story/show/168752341
                          onClick={() => console.log(props.selectedInstitution)}
                        >
                          {t("signUp.stepTwo.rightButton")}
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
