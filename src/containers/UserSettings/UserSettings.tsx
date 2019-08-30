import { Dispatch, SetStateAction, useEffect } from "react";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";
import { InstitutionCard } from "../../components/InstitutionCard/InstitutionCard";

interface IUserSettingsCustomProps {
  userProfile: {
    email: string;
    fiscalCode: string;
    name: string;
    role: string;
  };
}

interface IUserSettingsProps
  extends IUserSettingsCustomProps,
    RouteComponentProps {}

export const UserSettings = withRouter<
  IUserSettingsProps,
  React.FC<IUserSettingsProps>
>((props: IUserSettingsProps) => {
  return (
    <div className="UserSettings container-fluid app-body-mt">
      <div className="row pt-5">
        <div className="col-2">
          <button
            className="btn btn-link btn-icon mt-5 pl-4"
            onClick={() => {
              return props.history.push("/dashboard");
            }}
          >
            <svg className="icon icon-primary">
              <use xlinkHref={`${bootstrapItaliaImages}#it-chevron-left`} />
            </svg>
            <span>Torna alla Dasbhoard</span>
          </button>
        </div>
        <div className="col-8">
          <div className="card-wrapper card-space pr-4">
            <div className="card card-bg card-big">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h1>Il tuo profilo</h1>
                  </div>
                  <div className="col-6 text-right">
                    <button className="btn btn-outline-primary">Logout</button>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-6">
                    <p className="font-weight-bold mb-0">Nome e Cognome</p>
                  </div>
                  <div className="col-6">
                    <p className="font-weight-bold mb-0">Codice Fiscale</p>
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col-6">
                    <p className="mb-0">Luca Prete</p>
                  </div>
                  <div className="col-6">
                    <p className="mb-0">XXXXXXXXXXXXXXX</p>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-6">
                    <p className="font-weight-bold mb-0">Ruolo</p>
                  </div>
                </div>
                <div className="row pt-1">
                  <div className="col-6">
                    <p className="mb-0">Delegato ente</p>
                  </div>
                </div>
                <div className="row pt-4">
                  <div className="col-6">
                    <p className="font-weight-bold mb-0">E mail</p>
                  </div>
                </div>
                <div className="row pt-1 align-items-end">
                  <div className="col-3">
                    <p className="mb-0">luca.prete@gmail.com</p>
                  </div>
                  <div className="col-3">
                    <button className="btn btn-primary">Modifica Email</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
