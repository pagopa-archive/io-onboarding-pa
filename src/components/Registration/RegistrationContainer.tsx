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

  const initialSelectedInstitution: ComponentProps<
    typeof RegistrationStepOne
  >["selectedInstitution"] = {
    fiscalCode: "",
    ipaCode: "",
    legalRepresentative: {
      familyName: "",
      firstName: "",
      fiscalCode: "",
      phoneNumber: ""
    },
    name: "",
    pecs: [],
    scope: null,
    selectedPecIndex: null
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [institutions, setInstitutions] = useState([]);

  const [selectedInstitution, setSelectedInstitution] = useState({
    ...initialSelectedInstitution
  });

  const handleIntitutionSearch = (searchString: string) => {
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
        setInstitutions(responseData);
      });
  };

  const handleInstitutionSelected = (
    event: ReadonlyArray<
      ComponentProps<typeof RegistrationStepOne>["selectedInstitution"]
    >
  ) => {
    const newInstitution =
      event.length === 0
        ? {
            fiscalCode: "",
            ipaCode: "",
            legalRepresentative: {
              familyName: "",
              firstName: "",
              fiscalCode: "",
              phoneNumber: ""
            },
            name: "",
            pecs: [],
            scope: null,
            selectedPecIndex: null
          }
        : event[0];
    setSelectedInstitution(newInstitution);
  };

  const handlePecCheckboxChange = (selectedPecIndex: number) => {
    setSelectedInstitution(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedInstitution"]
      ) => {
        return { ...prevState, selectedPecIndex };
      }
    );
  };

  const handleScopeCheckboxChange = (selectedScope: string) => {
    setSelectedInstitution(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedInstitution"]
      ) => {
        return { ...prevState, scope: selectedScope };
      }
    );
  };

  const handleStepTwoInputChange = (inputName: string, inputValue: string) => {
    setSelectedInstitution(
      (
        prevState: ComponentProps<
          typeof RegistrationStepOne
        >["selectedInstitution"]
      ) => {
        return {
          ...prevState,
          legalRepresentative: {
            ...prevState.legalRepresentative,
            [inputName]: inputValue
          }
        };
      }
    );
  };

  const toggleConfirmationModal = () => {
    setShowConfirmModal((prevState: boolean) => !prevState);
  };

  const registrationBody = (step => {
    switch (step) {
      case "1":
        return (
          <RegistrationStepOne
            onPecCheckboxChange={handlePecCheckboxChange}
            onScopeCheckboxChange={handleScopeCheckboxChange}
            institutions={institutions}
            onInstitutionSearch={handleIntitutionSearch}
            onInstitutionSelected={handleInstitutionSelected}
            selectedInstitution={selectedInstitution}
            openConfirmModal={toggleConfirmationModal}
          />
        );
      case "2":
        return (
          <RegistrationStepTwo
            selectedInstitution={selectedInstitution}
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
      <Container fluid>
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
                outline
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
                onClick={() => props.history.push("/dashboard")}
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
