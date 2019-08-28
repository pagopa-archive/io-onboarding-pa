import { useState } from "react";
import * as React from "react";
import { withRouter } from "react-router";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

import { BackComponent } from "../../components/BackComponent/BackComponent";
import { RegistrationStepOne } from "../RegistrationSteps/RegistrationStepOne/RegistrationStepOne";
import {RegistrationStepThree} from "../RegistrationSteps/RegistrationStepThree/RegistrationStepThree";
import {RegistrationStepTwo} from "../RegistrationSteps/RegistrationStepTwo/RegistrationStepTwo";

export const RegistrationContainer = withRouter(props => {
  const initialSelectedInstitution: {
    institutionName: string;
    institutionFiscalCode: string;
    institutionAdminName: string;
    institutionPecs: ReadonlyArray<string>;
    institutionLegalRepName: string;
    institutionLegalRepSurname: string;
    institutionLegalRepCf: string;
  } = {
    institutionName: "Institution name",
    institutionFiscalCode: "",
    institutionAdminName: "",
    institutionPecs: [],
    institutionLegalRepName: "",
    institutionLegalRepSurname: "",
    institutionLegalRepCf: ""
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedInstitution, setSelectedInstitution] = React.useState({
    ...initialSelectedInstitution
  });

  const registrationBody = (step => {
    switch (step) {
      case "1":
        return <RegistrationStepOne institution={selectedInstitution} />;
      case "2":
        return <RegistrationStepTwo />;
      case "3":
        return <RegistrationStepThree />;
    }
  })(props.match.params.registrationStep);

  const toggleConfirmationModal = () => {
    setShowConfirmModal((prevState: boolean) => !prevState);
  };

  return (
    <div className="RegistrationContainer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <BackComponent openConfirmModal={toggleConfirmationModal} />
          </div>
          <div className="col-8">{registrationBody}</div>
          <div className="col-2">
            <Row>
              <Col>
                <p className=" pr-3 pt-5">Guida all'utilizzo</p>
                <p className="small pr-3">
                  Le informazioni legate al tuo ente vengono derivate dal
                  database di Indice PA. Nel caso alcune informazioni non siano
                  corrette o siano state cambiate di recente, richiedine la
                  modifica direttamente su Indice PA.
                </p>
                <p className="small pr-2">
                  Controlla le informazioni del tuo ente qui:
                  www.indicepa.gov.it
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Modal isOpen={showConfirmModal} toggle={toggleConfirmationModal}>
        <ModalHeader toggle={toggleConfirmationModal}>
          Annulla ricerca ente
        </ModalHeader>
        <ModalBody className="pt-4">
          <p>Sei sicuro di voler uscire dalla ricerca ente?</p>
          <p>
            Verrai rediretto alla tua dashboard personale e potrai iniziare di
            nuovo la ricerca ente quando lo riterrai più opportuno.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="row w-100 pt-4">
            <div className="col-6 text-left">
              <Button
                outline
                color="secondary"
                onClick={toggleConfirmationModal}
              >
                Annulla
              </Button>
            </div>
            <div className="col-6 text-right">
              <Button
                color="primary"
                className="btn btn-primary"
                onClick={() => props.history.push("/dashboard/")}
              >
                Conferma
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
});
