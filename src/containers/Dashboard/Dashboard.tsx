import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as React from "react";
import { InstitutionCard } from "../../components/InstitutionCard/InstitutionCard";

import "./Dashboard.css";
import { ServicesList } from "../ServicesList/ServicesList";

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
    institutionDelegates: [],
    institutionFiscalCode: "",
    institutionImage: "",
    institutionName: ""
  };

  const [userInstitution, setUserInstitution] = React.useState({
    ...initialUserInstitution
  });

  const [suggestedServices, setSuggestedServices] = React.useState([]);

  const [userServices, setUserServices] = React.useState([
    {
      serviceName: "Nomeprova",
      serviceState: "Proposto",
      activationDate: "23/08/2019",
      lastMessage: "23/08/2019",
      sentMessages: 10,
      owner: "Luca Prete"
    }
  ]);

  const [otherServices, setOtherServices] = React.useState([]);

  const [userActivities, setUserActivities] = React.useState([]);

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
        <div className="col-10 left-section app-body-mt">
          <div className="row pt-5">
            <div className="dashboard-col-middle dashboard-offset-col-left">
              <p className="dashboard-section-title">Il tuo Ente</p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col dashboard-col-left">
              <p className="leftbar-title pl-3 pr-3">Guida all'utilizzo</p>
              <p className="leftbar-text pl-3 pr-3">
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
          <div className="row pt-5">
            <div className="dashboard-col-middle dashboard-offset-col-left">
              <p className="dashboard-section-title">Schede Servizio</p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="dashboard-col-middle dashboard-offset-col-left">
              <p className="dashboard-section-subtitle">Servizi Proposti</p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col dashboard-col-left">
              <p className="leftbar-text pl-3 pr-3">
                In questa sezione si trovano le Schede Servizio che ti sono
                state inviate dagli sviluppatori per il tuo comune. Ogni Scheda
                Servizio può essere gestita da un solo Delegato, quindi il primo
                Delegato che accetta la scheda servizio sarà in responsabile
                diretto del servizio. La Scheda Servizio può essere ceduta a un
                diverso Delegato Ente in fase successiva.
              </p>
            </div>
            <div className="col dashboard-col-middle">
              <ServicesList services={suggestedServices} />
            </div>
          </div>
          <div className="row pt-3">
            <div className="dashboard-col-middle dashboard-offset-col-left">
              <p className="dashboard-section-subtitle">
                Le tue Schede Servizio
              </p>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col dashboard-col-left">
              <p className="leftbar-text pl-3 pr-3">
                In questa sezione si trovano le Schede Servizio di tua
                responsabilità. Una volta che ti prendi carico di un Servizio ne
                sei il custode delle Chiavi, che devono rimanere segrete. Puoi
                decidere tu quando abilitare il servizio all’invio di messaggi e
                in ogni momento puoi metterlo in pausa e/o richiedere modifiche
                allo sviluppatore. Puoi anche eliminare il servizio, la cui
                Scheda rimarrà comunque disattivata nella tua bacheca.
              </p>
            </div>
            <div className="col dashboard-col-middle">
              <ServicesList services={userServices} />
            </div>
          </div>
          <div className="row pt-3">
            <div className="dashboard-col-middle dashboard-offset-col-left">
              <p className="dashboard-section-subtitle">Altri Servizi</p>
            </div>
          </div>
          <div className="row pt-3 pb-5">
            <div className="col dashboard-col-left">
              <p className="leftbar-text pl-3 pr-3">
                In questa sezione si trovano le Schede Servizio di
                responsabilità degli altri Delegati Ente. Puoi visualizzarle ma
                non abilitarle, disattivarle, eliminarle. Il Delegato
                responsabile della Scheda Servizio può trasferirti la
                responsabilità nel caso in cui lo concordiate.
              </p>
            </div>
            <div className="col dashboard-col-middle">
              <ServicesList services={otherServices} />
            </div>
          </div>
        </div>
        <div className="col-2 right-section app-body-mt"></div>
      </div>
    </div>
  );
};
