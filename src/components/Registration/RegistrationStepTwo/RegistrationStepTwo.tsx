import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Row
} from "reactstrap";
import logoSignupStepTwoNew from "../../../assets/img/signup_step2_new.svg";

/**
 * Component for second step of registration process
 */
export const RegistrationStepTwo = () => {
  return (
    <div className="RegistrationStepTwo">
      <Container fluid>
        <Row>
          <Col sm="10">
            <Row>
              <Col sm="11">
                <h1 className="pt-4">
                  L'ente selezionato non è ancora iscritto a IO
                </h1>
                <Row className="pt-4">
                  <Col>
                    <p>
                      Per potere iscrivere un ente a IO è necessario
                      identificare un Legale Rappresentante che si assuma la
                      responsabilità dell’erogazione dei servizi dell’ente
                      tramite IO.
                    </p>
                    <Form
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      className="form-horizontal w-100 pt-3"
                    >
                      <h3>Legale Rappresentate</h3>
                      <p>
                        Queste informazioni verranno utilizzate per generare la
                        lettera di adesione dell’ente e l’accordo di
                        contitolarità per il trattamento dei dati. Potrai
                        prendere visione dei documenti alla pagina successiva.
                      </p>
                      <FormGroup row className="pt-3 mb-3">
                        <Col sm="6">
                          <Label htmlFor="name-input" className="active">
                            Nome
                          </Label>
                          <Input
                            type="text"
                            id="name-input"
                            name="name-input"
                            placeholder=""
                          />
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="surname-input" className="active">
                            Cognome
                          </Label>
                          <Input
                            type="text"
                            id="surname-input"
                            name="surname-input"
                            placeholder=""
                          />
                        </Col>
                      </FormGroup>
                      <p className="mb-5">
                        Se il nome e cognome sono già presenti è perchè abbiamo
                        recuperato queste informazioni da IndicePA. Puoi
                        modificare i campi precompilati se hai identificato un
                        altro legale rappresentante. In quel caso le modifiche
                        non si rifletteranno su IndicePA, ti consigliamo di
                        aggiornare questa informazione anche su&nbsp;
                        <a href="http://www.indicepa.gov.it">
                          www.indicepa.gov.it
                        </a>
                      </p>
                      <FormGroup row className="pt-3">
                        <Col sm="6">
                          <Label htmlFor="fc-input" className="active">
                            Codice Fiscale
                          </Label>
                          <Input
                            type="text"
                            id="fc-input"
                            name="fc-input"
                            placeholder="Inserisci il CF personale del legale rappresentante"
                          />
                        </Col>
                        <Col sm="6">
                          <Label htmlFor="phone-input" className="active">
                            Numero di telefono dell'ufficio del Legale
                            Rappresentante
                          </Label>
                          <Input
                            type="text"
                            id="phone-input"
                            name="phone-input"
                            placeholder="Inserisci il numero di telefono dell'ufficio"
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                    <Row className="pb-3">
                      <Col size={6} className="text-left">
                        <Button outline color="secondary" className="w-50">
                          Annulla
                        </Button>
                      </Col>
                      <Col size={6} className="text-right">
                        <Button color="primary" className="w-50">
                          Conferma
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="2">
            <Media
              object
              src={logoSignupStepTwoNew}
              alt="Signup step one logo"
              className="pt-3 w-75"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
