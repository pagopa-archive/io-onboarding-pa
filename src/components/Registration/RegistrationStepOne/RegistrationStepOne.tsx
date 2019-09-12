import { index } from "fp-ts/lib/Array";
import React, { ComponentProps } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import { SearchInstitutions } from "./SearchInstitutions";

interface IPathParams {
  registrationStep: string;
}

interface IRegistrationStepOneProps
  extends ComponentProps<typeof SearchInstitutions>,
    RouteComponentProps<IPathParams> {}

/**
 * Component for institution search with autocomplete
 */
export const RegistrationStepOne = withRouter(
  (props: IRegistrationStepOneProps) => {
    const pecRadioButtons = props.selectedInstitution.pecs.map(
      (pec, pecIndex) => {
        return (
          <FormGroup check className="radio" key={pecIndex}>
            <Input
              className="form-check-input"
              type="radio"
              id={`radio-${pec}`}
              name="radios-pec"
              value={pecIndex}
              checked={props.selectedInstitution.selectedPecIndex === pecIndex}
              onChange={() => {
                props.selectedInstitution.selectedPecIndex = pecIndex;
              }}
            />
            <Label check className="form-check-label" htmlFor={`radio-${pec}`}>
              {pec}
            </Label>
          </FormGroup>
        );
      }
    );

    const institutionScopes: ReadonlyArray<{ label: string; value: string }> = [
      { label: "Locale (es. comuni, regioni)", value: "LOCAL" },
      { label: "Nazionale (es. enti centrali)", value: "NATIONAL" }
    ];

    const scopeRadioButtons = institutionScopes.map(scope => {
      return (
        <FormGroup check className="radio" key={scope.value}>
          <Input
            className="form-check-input"
            type="radio"
            id={`radio-${scope.value}`}
            name="radios-scopes"
            value={scope.value}
            checked={props.selectedInstitution.scope === scope.value}
            onChange={() => {
              props.selectedInstitution.scope = scope.value;
            }}
          />
          <Label
            check
            className="form-check-label"
            htmlFor={`radio-${scope.value}`}
          >
            {scope.label}
          </Label>
        </FormGroup>
      );
    });

    return (
      <div className="RegistrationStepOne">
        <Container fluid>
          <Row>
            <Col sm="10">
              <h1 className="pt-5">Ricerca Ente</h1>
              <Row className="pt-4">
                <Col>
                  <SearchInstitutions
                    selectedInstitution={props.selectedInstitution}
                    onInstitutionSelected={props.onInstitutionSelected}
                  />
                  <Form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal w-100 pt-5"
                  >
                    <FormGroup row className="pt-5">
                      <Col sm="12">
                        <Label htmlFor="ipa-code-input" className="active">
                          Codice Fiscale*
                        </Label>
                        <Input
                          type="text"
                          id="ipa-code-input"
                          name="ipa-code-input"
                          placeholder=""
                          readOnly
                          value={props.selectedInstitution.fiscalCode || ""}
                        />
                        <FormText color="muted">
                          *Precompilato da IndicePA
                        </FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="admin-name-input">
                          Nome Amministrazione*
                        </Label>
                      </Col>
                      <Col sm="12">
                        <Input
                          type="text"
                          id="admin-name-input"
                          name="admin-name-input"
                          placeholder=""
                          readOnly
                          value={props.selectedInstitution.name || ""}
                        />
                        <FormText color="muted">
                          *Precompilato da IndicePA
                        </FormText>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <Label htmlFor="text-input">Indirizzo PEC</Label>
                      </Col>
                      <Col sm="9">{pecRadioButtons}</Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm="3">
                        <Label htmlFor="text-input">Area di competenza</Label>
                      </Col>
                      <Col sm="9">{scopeRadioButtons}</Col>
                    </FormGroup>
                  </Form>
                  <Row>
                    <Col size={6} className="text-left">
                      <Button
                        outline
                        color="secondary"
                        className="w-50"
                        onClick={() => props.history.push("/dashboard/")}
                      >
                        Annulla
                      </Button>
                    </Col>
                    <Col size={6} className="text-right">
                      <Button
                        color="primary"
                        className="w-50"
                        onClick={() => props.history.push("/registrazione/2")}
                      >
                        Conferma
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
