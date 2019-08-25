import * as React from "react";
import {withRouter} from "react-router";
import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

import "./SpidLogin.css";
import {Spidbutton} from "../../components/SpidButton/SpidButton";

export const SpidLogin = withRouter(props => {
  return (
    <div className="SpidLogin">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-link btn-icon mt-5 pl-4"
                  onClick={() => {
                    return props.history.push("/home");
                  }}
                >
                  <svg className="icon icon-primary">
                    <use
                      xlinkHref={`${bootstrapItaliaImages}#it-chevron-left`}
                    />
                  </svg>
                  <span>Torna indietro</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card-wrapper card-space mt-5">
              <div className="card card-bg card-big">
                <div className="card-body">
                  <h2 className="card-title pb-4">
                    Accedi come Delegato Ente con SPID
                  </h2>
                  <div className="row">
                    <div className="col-3">
                      <Spidbutton/>
                    </div>
                    <div className="col-9">
                      <p className="card-text font-weight-bold mb-0">
                        Cos'è SPID
                      </p>
                      <p className="card-text">
                        SPID è il sistema di accesso ai servizi forniti dalla
                        Pubblica Amministrazione e dai privati accreditati
                        attraverso un'unica identità digitale
                      </p>
                      <p className="card-text font-weight-bold mb-0">
                        Sei già in possesso di un'utenza SPID?
                      </p>
                      <p className="card-text">
                        Accedi con le credenziali fornite dal tuo gestore
                      </p>
                      <p className="card-text font-weight-bold">
                        Non hai ancora un'utenza SPID?
                      </p>
                      <a
                        href="#"
                        className="btn btn-outline-primary mb-4"
                        role="button"
                      >
                        Richiedila a uno dei gestori
                      </a>
                      <p className="card-text font-weight-bold mb-0">
                        Cosa posso fare con SPID
                      </p>
                      <p className="card-text">
                        In questa fase di avvio del servizio le credenziali SPID
                        sono utilizzabili solo per l'accesso ai servizi per il
                        cittadino
                      </p>
                      <a
                        href="#"
                        className="btn btn-outline-primary"
                        role="button"
                      >
                        Maggiori informazioni su SPID
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <p className="card-text pt-5">
              Se ti sei sbagliato e invece volevi accedere con un profilo diverso invece clicca qui sotto
            </p>
            <a
              href="#"
              className="btn btn-outline-primary"
              role="button"
              onClick={() => {
                return props.history.push("/home");
              }}
            >
              Torna alla home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
