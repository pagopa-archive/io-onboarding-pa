import * as React from "react";
import { withRouter } from "react-router";

export const RegistrationStepTwo = withRouter(props => {
  return (
    <div className="RegistrationStepTwo">
      <div className="row">
        <div className="col-12">
          <h2 className="pt-5">
            Il Comune di Ripalta Cremasca non è ancora iscritto al Portale Enti
          </h2>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <p>
            Per potere iscrivere un ente a IO è necessario identificare un
            Legale Rappresentante che si assuma la responsabilità
            dell’erogazione dei servizi dell’ente tramite IO.
          </p>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <h4>Legale Rappresentante</h4>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <p>
            Queste informazioni verranno utilizzate per generare la lettera di
            adesione dell’ente e l’accordo di contitolarità per il trattamento
            dei dati. Potrai prendere visione dei documenti alla pagina
            successiva.
          </p>
        </div>
      </div>
      <div className="form-row pt-5">
        <div className="form-group col-md-6">
          <input type="text" className="form-control" id="formNome" />
          <label htmlFor="formNome" className="active">
            Nome
          </label>
        </div>
        <div className="form-group col-md-6">
          <input type="text" className="form-control" id="formCognome" />
          <label htmlFor="formCognome" className="active">
            Cognome
          </label>
        </div>
      </div>
      <div className="row pt-2">
        <div className="col-12">
          <p>
            Se il nome e cognome sono già presenti è perchè abbiamo recuperato
            queste informazioni da IndicePA. Puoi modificare i campi
            precompilati se hai identificato un altro legale rappresentante. In
            quel caso le modifiche non si rifletteranno su IndicePA, ti
            consigliamo di aggiornare questa informazione anche su
            www.indicepa.gov.it{" "}
          </p>
        </div>
      </div>
      <div className="form-row pt-3">
        <div className="form-group col-12">
          <input type="text" className="form-control" id="codFisc" />
          <label htmlFor="codFisc" className="active">
            Codice fiscale
          </label>
        </div>
      </div>
      <div className="row pb-4">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-outline-secondary w-50"
            onClick={() => props.history.push("/registrazione/1")}
          >
            Annulla
          </button>
        </div>
        <div className="col-6 text-right">
          <button
            type="button"
            className="btn btn-primary w-50"
            onClick={() => props.history.push("/registrazione/3")}
          >
            Genera documenti
          </button>
        </div>
      </div>
    </div>
  );
});
