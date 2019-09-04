import React from "react";
import { withRouter } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";
import { SpidLoginButton } from "./SpidLoginButton/SpidLoginButton";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

import "./SpidLogin.css";

/**
 * Component for spid login for delegate
 */
export const SpidLogin = withRouter(props => {
  return (
    <div className="SpidLogin">
      <Container fluid>
        <Row>
          <Col sm="2">
            <Row>
              <Col>
                <Button
                  color="link"
                  className="btn-icon mt-5 pl-4"
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
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm="8">
            <div className="card-wrapper card-space mt-5">
              <Card className="card-bg card-big">
                <CardBody>
                  <CardTitle>
                    <h2 className="pb-4">Accedi con SPID</h2>
                  </CardTitle>
                  <Row>
                    <Col sm="9 card-text">
                      <p className="font-weight-bold mb-0">Cos'è SPID</p>
                      <p>
                        SPID è il sistema di accesso ai servizi forniti dalla
                        Pubblica Amministrazione e dai privati accreditati
                        attraverso un'unica identità digitale
                      </p>
                      <p className="font-weight-bold mb-0">
                        Sei già in possesso di un'utenza SPID?
                      </p>
                      <p>Accedi con le credenziali fornite dal tuo gestore</p>
                      <p className="font-weight-bold mb-1">
                        Non hai ancora un'utenza SPID?
                      </p>
                      <a
                        href="https://www.spid.gov.it/richiedi-spid"
                        className="btn btn-link mb-4 pl-0"
                      >
                        Richiedila a uno dei gestori
                      </a>
                      <p className="font-weight-bold mb-0">
                        Cosa posso fare con SPID
                      </p>
                      <p className="mb-1">
                        In questa fase di avvio del servizio le credenziali SPID
                        sono utilizzabili solo per l'accesso ai servizi per il
                        cittadino
                      </p>
                      <a
                        href="https://www.spid.gov.it"
                        className="btn btn-link pl-0"
                        role="button"
                      >
                        Maggiori informazioni su SPID
                      </a>
                    </Col>
                    <Col sm="3">
                      <SpidLoginButton />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Col>
          <div className="col-2 pl-3 pr-3">
            <p className="card-text pt-5 small">
              Se ti sei sbagliato e volevi accedere con un profilo diverso
              clicca qui sotto
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
        </Row>
      </Container>
    </div>
  );
});
