import { useState } from "react";
import * as React from "react";
import { withRouter } from "react-router";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { BackComponent } from "../../components/BackComponent/BackComponent";
import { RegistrationStepOne } from "../RegistrationSteps/RegistrationStepOne/RegistrationStepOne";

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
        return <div>Ciao2</div>;
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
