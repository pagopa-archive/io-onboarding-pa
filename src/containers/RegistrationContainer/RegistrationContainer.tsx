import * as React from "react";
import { withRouter } from "react-router";

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
    institutionLegalRepCf: "",
  };

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

  return (
    <div className="RegistrationContainer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <BackComponent />
          </div>
          <div className="col-8">{registrationBody}</div>
        </div>
      </div>
    </div>
  );
});
