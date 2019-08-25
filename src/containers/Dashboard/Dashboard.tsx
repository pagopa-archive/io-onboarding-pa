import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import { InstitutionCard } from "../../components/InstitutionCard/InstitutionCard";

import "./Dashboard.css";

interface IDashboardProps {
  setUserProfileData: Dispatch<
    SetStateAction<{
      email: string;
      fiscalCode: string;
      name: string;
      role: string;
    }>
  >;
}

export const Dashboard: React.FC<IDashboardProps> = props => {
  const initialUserInstitution: {
    institutionDelegates: ReadonlyArray<string>;
    institutionFiscalCode: string;
    institutionImage: string;
    institutionName: string;
  } = {
    institutionDelegates: ["Luca Prete"],
    institutionFiscalCode: "LTADVD88T22F205H",
    institutionImage: "aaa",
    institutionName: "Comune di Ripalta Cremasca"
  };

  const [userInstitution, setUserInstitution] = React.useState({
    ...initialUserInstitution
  });

  const [suggestedServices, setSuggestedServices] = React.useState([]);

  const [userServices, setUserServices] = React.useState([]);

  const [otherServices, setOtherServices] = React.useState([]);

  useEffect(() => {
    props.setUserProfileData({
      email: "luca.prete@gmail.com",
      fiscalCode: "LLLL",
      name: "Luca Prete",
      role: "Delegato"
    });
  }, []);

  return (
    <div className="Dashboard container-fluid">
      <div className="row">
        <div className="col-10">
          <div className="row pt-5">
            <div className="col dashboard-col-left">
              <p className="leftbar-title">Guida all'utilizzo</p>
              <p className="leftbar-text">
                Le informazioni legate al tuo Ente vengono derivate dal database
                di Indice PA. Nel caso alcune informazioni non siano corrette o
                siano state cambiate di recente, richiedine la modifica
                direttamente su Indice PA e le stesse verranno modificate sul
                Portale Enti.
              </p>
            </div>
            <div className="col dashboard-col-middle">
              <InstitutionCard
                institutionDelegates={userInstitution.institutionDelegates}
                institutionFiscalCode={userInstitution.institutionFiscalCode}
                institutionName={userInstitution.institutionName}
                institutionImage={userInstitution.institutionImage}
              />
            </div>
          </div>
        </div>
        <div className="col-2 right-section"></div>
      </div>
    </div>
  );
};
