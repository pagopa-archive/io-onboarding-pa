import React, { ChangeEvent, ComponentProps, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Media,
  Row
} from "reactstrap";

import {
  OrganizationScope,
  OrganizationScopeEnum
} from "../../../../generated/definitions/api/OrganizationScope";

import { SearchAdministrations } from "./SearchAdministrations";

import useForm from "react-hook-form";
import { OrganizationFiscalCode } from "../../../../generated/definitions/api/OrganizationFiscalCode";
import logoSignupStepOne from "../../../assets/img/signup_step1.svg";
import { ValueOf } from "../../../utils/value-of";

interface IRegistrationStepOneProps
  extends ComponentProps<typeof SearchAdministrations>,
    RouteComponentProps<{ registrationStep: string }> {
  openConfirmModal: () => void;
  isAdministrationAlreadyRegistered: boolean;
  onRegistrationStepOneSubmit: (formData: IRegistrationStepOneFormData) => void;
}

// Types for form input
interface IRegistrationStepOneFormData {
  cf: OrganizationFiscalCode;
  name: string;
  selectedPecLabel: string;
  organizationScope: OrganizationScope;
}

interface IRegistrationStepOneRadioButtonsProps {
  dataArray: ReadonlyArray<{
    label: string;
    value: ValueOf<
      ComponentProps<typeof SearchAdministrations>["selectedAdministration"]
    >;
  }>;
  // tslint:disable:no-any
  register: ReturnType<typeof useForm>["register"];
  unregister: ReturnType<typeof useForm>["unregister"];
  setValue: ReturnType<typeof useForm>["setValue"];
  name: string;
  disabled: boolean;
  errors: ReturnType<typeof useForm>["errors"];
  errorText: string;
  defaultCheckedValue: ValueOf<
    ComponentProps<typeof SearchAdministrations>["selectedAdministration"]
  >;
}

const RegistrationStepOneRadioButtons = React.memo(
  (props: IRegistrationStepOneRadioButtonsProps) => {
    useEffect(() => {
      props.register({ name: props.name }, { required: props.errorText });
      if (props.defaultCheckedValue) {
        props.setValue(props.name, props.defaultCheckedValue);
      }
      return () => props.unregister(props.name);
    }, [props.name, props.register, props.unregister]);

    const setCheckboxValue = (e: ChangeEvent<HTMLInputElement>) => {
      props.setValue(props.name, e.target.value);
    };

    const propWithError = props.errors[props.name];

    const content = props.dataArray.map((elem, index) => {
      return (
        <FormGroup check={true} className="radio" key={elem.label}>
          <Input
            className="form-check-input"
            type="radio"
            name={props.name}
            id={`radio-scope-${elem.value}`}
            value={elem.value && elem.value.toString()}
            disabled={props.disabled}
            invalid={props.errors[props.name] !== undefined}
            defaultChecked={props.defaultCheckedValue === elem.value}
            onChange={setCheckboxValue}
          />
          <Label
            check={true}
            className="form-check-label"
            htmlFor={`radio-scope-${elem.value}`}
          >
            {elem.label}
          </Label>
          {/*Add form feedback after last radio button*/}
          {index === props.dataArray.length - 1 ? (
            <FormFeedback>
              {!props.errors || !propWithError ? "" : propWithError.message}
            </FormFeedback>
          ) : null}
        </FormGroup>
      );
    });
    return <Fragment>{content}</Fragment>;
  }
);

/**
 * Component for first step of registration process
 */
export const RegistrationStepOne = withRouter(
  (props: IRegistrationStepOneProps) => {
    /**
     * react-i18next translation hook
     */
    const { t } = useTranslation();

    const { register, unregister, handleSubmit, errors, setValue } = useForm<
      IRegistrationStepOneFormData
    >();

    const requiredInputErrorText = `${t("common.inputs.errors.requiredField")}`;

    const pecsArray = Object.keys(props.selectedAdministration.pecs).map(
      key => ({
        label: props.selectedAdministration.pecs[key],
        value: key
      })
    );

    const organizationScopes: ReadonlyArray<{
      label: string;
      value: OrganizationScopeEnum;
    }> = [
      {
        label: t("signUp.stepOne.scopeRadio.localLabel"),
        value: OrganizationScopeEnum.LOCAL
      },
      {
        label: t("signUp.stepOne.scopeRadio.nationalLabel"),
        value: OrganizationScopeEnum.NATIONAL
      }
    ];

    const goToSignUpStepTwo = () => props.history.push("/sign-up/2");

    const onRegistrationStepOneSubmit = handleSubmit(formData => {
      props.onRegistrationStepOneSubmit(formData);
      return goToSignUpStepTwo();
    });

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
                      <Form className="form-horizontal w-100 mt-5">
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
                              name="cf"
                              placeholder=""
                              readOnly={true}
                              innerRef={register({
                                required: requiredInputErrorText
                              })}
                              invalid={errors.cf !== undefined}
                              defaultValue={
                                props.selectedAdministration.fiscal_code
                              }
                            />
                            <FormFeedback>
                              {errors.cf && errors.cf.message}
                            </FormFeedback>
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
                              name="name"
                              placeholder=""
                              readOnly={true}
                              innerRef={register({
                                required: requiredInputErrorText
                              })}
                              invalid={errors.name !== undefined}
                              defaultValue={props.selectedAdministration.name}
                            />
                            <FormFeedback>
                              {errors.name && errors.name.message}
                            </FormFeedback>
                            <FormText color="muted">
                              {t("signUp.stepOne.inputs.precompiledLabel")}
                            </FormText>
                          </Col>
                        </FormGroup>
                        {props.selectedAdministration.name ? (
                          <Fragment>
                            <FormGroup row={true}>
                              <Col sm="4">
                                <Label htmlFor="text-input">
                                  {t("signUp.stepOne.inputs.pecLabel")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <RegistrationStepOneRadioButtons
                                  name="selectedPecLabel"
                                  disabled={
                                    props.isAdministrationAlreadyRegistered
                                  }
                                  dataArray={pecsArray}
                                  defaultCheckedValue={
                                    props.selectedAdministration
                                      .selected_pec_label
                                  }
                                  errors={errors}
                                  errorText={requiredInputErrorText}
                                  register={register}
                                  setValue={setValue}
                                  unregister={unregister}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row={true} className="mb-5">
                              <Col sm="4">
                                <Label htmlFor="text-input">
                                  {t("signUp.stepOne.inputs.scopeLabel")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <RegistrationStepOneRadioButtons
                                  name="organizationScope"
                                  disabled={
                                    props.isAdministrationAlreadyRegistered
                                  }
                                  dataArray={organizationScopes}
                                  defaultCheckedValue={
                                    props.selectedAdministration.scope
                                  }
                                  errors={errors}
                                  errorText={requiredInputErrorText}
                                  register={register}
                                  setValue={setValue}
                                  unregister={unregister}
                                />
                              </Col>
                            </FormGroup>
                          </Fragment>
                        ) : null}
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
                            onClick={onRegistrationStepOneSubmit}
                            disabled={!props.selectedAdministration.name}
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
