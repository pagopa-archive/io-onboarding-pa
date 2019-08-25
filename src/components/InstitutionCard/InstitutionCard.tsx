import React, {FC, Fragment} from "react";

import "./InstitutionCard.css";

interface IInstitutionCardProps {
  institutionDelegates: ReadonlyArray<string>;
  institutionFiscalCode: string;
  institutionImage: string;
  institutionName: string;
}

export const InstitutionCard: FC<IInstitutionCardProps> = props => {
  const enum InstitutionStates {
    NotSet,
    WaitingSignage,
    MissingImage,
    Complete
  }

  const institutionState = !props.institutionName ? InstitutionStates.NotSet : (
    props.institutionDelegates.length === 0 ? InstitutionStates.WaitingSignage : (
      !props.institutionImage ? InstitutionStates.MissingImage : InstitutionStates.Complete
    )
  );

  const imgNameCfRow =
    institutionState !== InstitutionStates.NotSet ? (
      <div className="row">
        <div className="col-2 text-center pt-4"></div>
        <div className="col-10 pt-4">
          <div className="row">
            <div className="col">
              <p className="institution-name">{props.institutionName}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="institution-cf">{`Codice fiscale: ${props.institutionFiscalCode}`}</p>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const imageButton =
    institutionState !== InstitutionStates.NotSet && institutionState !== InstitutionStates.WaitingSignage ? (
      <button type="button" className="btn btn-outline-primary">
        {`${institutionState !== InstitutionStates.MissingImage ? "Modifica" : "Carica file"}`}
      </button>
    ) : null;

  const alertDiv = institutionState !== InstitutionStates.Complete ? (
    <div
      className={`alert ${
        institutionState === InstitutionStates.NotSet || institutionState === InstitutionStates.WaitingSignage
          ? "alert-info"
          : "alert-warning"
        }`}
      role="alert"
    >
      {institutionState === InstitutionStates.NotSet
        ? "Abbiamo acquisito i tuoi dati da SPID, li puoi visualizzare nel tuo profilo personale, in questa dashboard in alto a destra. Puoi modificare il tuo contatto email lucaprete@gmail.com nel tuo profilo nel caso tu abbia un’email di lavoro diversa da quella personale."
        : (institutionState === InstitutionStates.WaitingSignage
          ? "Il tuo Ente è in attesa di essere confermato dal Responsabile Legale e verificato da PagoPA SpA. Senza la firma del tuo Rappresentante Legale non possiamo generare il profilo Ente sul Backoffice, ricordagli di aprire la mail, firmare i documenti e inviarli all’indirizzo digitale indicato nella mail."
          : "Aggiungi lo stemma al tuo profilo Ente per poter abilitare i Servizi"}
    </div>
  ) : null;

  const alertRow = (
    <div className="row">
      {props.institutionName ? <div className="col-2 text-center">{imageButton}</div> : null}
      <div className={`col-10 pt-4 ${institutionState === InstitutionStates.NotSet ? "pl-4" : "pr-4"}`}>{alertDiv}</div>
    </div>
  );

  const additionalTextRow = institutionState !== InstitutionStates.WaitingSignage ? (
    <div className="row">
      <div className={`col-10 ${institutionState !== InstitutionStates.NotSet ? "offset-2" : "pl-4"} pt-3`}>
        {institutionState === InstitutionStates.NotSet ?
          <Fragment>
            <p className="mb-0">Non hai ancora un Ente assegnato</p>
            <p>Richiedi la Delega a un Ente esistente o registra il tuo Ente tu stesso.</p>
          </Fragment> :
          <div className="row">
            <p className="col-auto">Delegati ente:</p>
            <p className="col-auto font-weight-bold">{props.institutionDelegates.join(', ')}</p>
          </div>
        }
      </div>
    </div>
  ) : null;

  const buttonRow = institutionState === InstitutionStates.NotSet || institutionState === InstitutionStates.WaitingSignage ? (
    <div className="row">
      <div className={`col-10 ${institutionState !== InstitutionStates.NotSet ? "offset-2" : "pl-4"} pt-3`}>
        <button type="button" className="btn btn-primary">
          {`${institutionState === InstitutionStates.NotSet ? "Ricerca il tuo ente" : "Invia i documenti alla PEC di nuovo"}`}
        </button>
      </div>
    </div>
  ) : null;


  return (
    <div className="InstitutionCard">
      <div className="card-wrapper card-space">
        <div className="card card-bg card-big">
          <div className="card-body">
            {imgNameCfRow}
            {alertRow}
            {additionalTextRow}
            {buttonRow}
          </div>
        </div>
      </div>
    </div>
  );
};
