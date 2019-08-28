import * as React from "react";
import {withRouter} from "react-router";
import {Input, Label} from "reactstrap";

export const RegistrationStepThree = withRouter(props => {
  return (
    <div className="RegistrationStepThree">
      <div className="row">
        <div className="col-12">
          <h2 className="pt-5">
            Verifica e invio documenti legali
          </h2>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <p>
            Visualizza i documenti creati e, se tutte le informazioni sono corrette, procedi all’invio della documentazione al tuo Legale Rappresentante e alla società PagoPA SpA.
          </p>
          <p>
            Il Legale Rappresentante riceverà i documenti via PEC, dovrà procedere alla firma digitale degli stessi e inviarli nuovamente a PagoPA SpA per verifica, seguendo le istruzioni contenute nella mail.
          </p>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-12">
          <h4>Accordo Ente/PagoPA Spa</h4>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <p>
            Questo documento viene generato una sola volta alla creazione di ogni profilo Ente.
            Verificane la correttezza prima di procedere con la creazione del profilo Ente.
          </p>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-auto">
          <button type="button" className="btn btn-outline-primary">
            Visualizza documento
          </button>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-12">
          <h4>Delega gestione profilo dell’ente su IO</h4>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12">
          <p>
            Questo documento è la tua delega personale alla gestione del profilo digitale dell’Ente. Ogni tuo collega
            che richieda una delega dovrà generare il proprio documento al primo accesso.
            Verificane la correttezza prima di procedere con la creazione del profilo Ente.
          </p>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-auto">
          <button type="button" className="btn btn-outline-primary">
            Visualizza documento
          </button>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col-12">
          <div className="form-check">
            <Input
              type="checkbox"
              id="checkbox1"
              name="checkbox1"
              value="option1"
            />
            <Label check className="form-check-label" htmlFor="checkbox1">Confermo che le informazioni nei documenti sono complete e corrette</Label>
          </div>
        </div>
      </div>
      <div className="row pt-3 pb-4">
        <div className="col-6">
          <button type="button" className="btn btn-outline-secondary w-50" onClick={() => props.history.push("/registrazione/2")}>
            Annulla
          </button>
        </div>
        <div className="col-6 text-right">
          <button type="button" className="btn btn-primary w-50" onClick={() => props.history.push("/dashboard")}>
            Conferma creazione ente
          </button>
        </div>
      </div>
    </div>
  );
});
