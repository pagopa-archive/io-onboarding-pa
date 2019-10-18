import React, { ComponentProps, Fragment, useContext } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import { FiscalCode } from "../../../generated/definitions/api/FiscalCode";
import { OrganizationFiscalCode } from "../../../generated/definitions/api/OrganizationFiscalCode";
import { OrganizationScope } from "../../../generated/definitions/api/OrganizationScope";
import { ICustomWindow } from "../../customTypes/CustomWindow";

import { RegistrationStepButtons } from "./RegistrationStepButtons/RegistrationStepButtons";
import { RegistrationStepOne } from "./RegistrationStepOne/RegistrationStepOne";
import { RegistrationStepThree } from "./RegistrationStepThree/RegistrationStepThree";
import { RegistrationStepTwo } from "./RegistrationStepTwo/RegistrationStepTwo";

import { TokenContext } from "../../context/token-context";

export const RegistrationContainer = withRouter(props => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  /**
   * Create window with custom element _env_ for environment variables
   */
  const customWindow = window as ICustomWindow;

  const tokenContext = useContext(TokenContext);

  const initialSelectedAdministration: ComponentProps<
    typeof RegistrationStepOne
  >["selectedAdministration"] = {
    fiscal_code: "" as OrganizationFiscalCode,
    ipa_code: "",
    legal_representative: {
      family_name: "",
      fiscal_code: "" as FiscalCode,
      given_name: "",
      phone_number: ""
    },
    name: "",
    pecs: {},
    scope: undefined,
    selectedPecLabel: ""
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [administrations, setAdministrations] = useState([]);

  const [selectedAdministration, setSelectedAdministration] = useState({
    ...initialSelectedAdministration
  });

  const handleAdministrationSearch = (searchString: string) => {
    const url =
      customWindow._env_.IO_ONBOARDING_PA_API_HOST +
      ":" +
      customWindow._env_.IO_ONBOARDING_PA_API_PORT +
      `/public-administrations?search=${searchString}`;
    fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + tokenContext.token
        // 'Content-Type': 'application/json'
      },
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setAdministrations(responseData);
      })
      .catch(error => {
        return error;
      });
  };

  const handleAdministrationSelected = (
    event: ReadonlyArray<
      ComponentProps<typeof RegistrationStepOne>["selectedAdministration"]
    >
  ) => {
    const newAdministration =
      event.length === 0
        ? {
            fiscal_code: "" as OrganizationFiscalCode,
            ipa_code: "",
            legal_representative: {
              family_name: "",
              fiscal_code: "" as FiscalCode,
              given_name: "",
              phone_number: ""
            },
            name: "",
            pecs: {},
            scope: undefined,
            selectedPecLabel: ""
          }
        : event[0];
    setSelectedAdministration(newAdministration);
  };

  const handlePecCheckboxChange = (selectedPecLabel: string) => {
    setSelectedAdministration(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedAdministration"]
      ) => {
        return { ...prevState, selectedPecLabel };
      }
    );
  };

  const handleScopeCheckboxChange = (selectedScope: OrganizationScope) => {
    setSelectedAdministration(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedAdministration"]
      ) => {
        return { ...prevState, scope: selectedScope };
      }
    );
  };

  const handleStepTwoInputChange = (inputName: string, inputValue: string) => {
    setSelectedAdministration(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedAdministration"]
      ) => {
        return {
          ...prevState,
          legal_representative: {
            ...prevState.legal_representative,
            [inputName]: inputValue
          }
        };
      }
    );
  };

  const toggleConfirmationModal = () => {
    setShowConfirmModal((prevState: boolean) => !prevState);
  };

  const navigateToDashboard = () => props.history.push("/dashboard");

  const registrationBody = (step => {
    switch (step) {
      case "1":
        return (
          <RegistrationStepOne
            onPecCheckboxChange={handlePecCheckboxChange}
            onScopeCheckboxChange={handleScopeCheckboxChange}
            administrations={administrations}
            onAdministrationSearch={handleAdministrationSearch}
            onAdministrationSelected={handleAdministrationSelected}
            selectedAdministration={selectedAdministration}
            openConfirmModal={toggleConfirmationModal}
          />
        );
      case "2":
        return (
          <RegistrationStepTwo
            selectedAdministration={selectedAdministration}
            onStepTwoInputChange={handleStepTwoInputChange}
          />
        );
      case "3":
        return <RegistrationStepThree />;
    }
  })(props.match.params.signUpStep);

  const rightColumnContent = (step => {
    switch (step) {
      case "1":
        return (
          <Fragment>
            <p className="pr-3 mt-5">{t("signUp.rightCol.title")}</p>
            <p className="small pr-3">{t("signUp.rightCol.text")}</p>
            <p className="small pr-2">
              {t("signUp.rightCol.additionalInfo")}&nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.indicepa.gov.it"
              >
                www.indicepa.gov.it
              </a>
            </p>
          </Fragment>
        );
      case "2":
      case "3":
        return null;
    }
  })(props.match.params.signUpStep);

  return (
    <div className="RegistrationContainer">
      <Container fluid={true}>
        <Row>
          <Col sm="2">
            <RegistrationStepButtons
              openConfirmModal={toggleConfirmationModal}
            />
          </Col>
          <Col sm="8">{registrationBody}</Col>
          <Col sm="2">
            <Row>
              <Col>{rightColumnContent}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={showConfirmModal} toggle={toggleConfirmationModal}>
        <ModalHeader toggle={toggleConfirmationModal}>
          {t("signUp.backModal.title")}
        </ModalHeader>
        <ModalBody className="pt-4">
          <p>{t("signUp.backModal.text")}</p>
          <p>{t("signUp.backModal.additionalText")}</p>
        </ModalBody>
        <ModalFooter>
          <Row className="w-100 pt-4">
            <Col sm="6" className="text-left">
              <Button
                outline={true}
                color="secondary"
                onClick={toggleConfirmationModal}
              >
                {t("signUp.backModal.leftButton")}
              </Button>
            </Col>
            <Col sm="6" className="text-right">
              <Button
                color="primary"
                className="btn btn-primary"
                onClick={navigateToDashboard}
              >
                {t("signUp.backModal.rightButton")}
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
});
