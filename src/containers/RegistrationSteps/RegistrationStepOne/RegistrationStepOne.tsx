import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import { SearchInstitutions } from "../../../components/SearchInstitutions/SearchInstitutions";

interface IRegistrationStepOneCustomProps {
  institution: {
    institutionName: string;
    institutionFiscalCode: string;
    institutionAdminName: string;
    institutionPecs: ReadonlyArray<string>;
    institutionLegalRepName: string;
    institutionLegalRepSurname: string;
    institutionLegalRepCf: string;
  };
}

interface IPathParams {
  registrationStep: string;
}

interface IRegistrationStepOneProps
  extends IRegistrationStepOneCustomProps,
    RouteComponentProps<IPathParams> {}

export const RegistrationStepOne = withRouter<
  IRegistrationStepOneProps,
  React.FC<IRegistrationStepOneProps>
>((props: IRegistrationStepOneProps) => {
  return (
    <div className="RegistrationStepOne">
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <h1 className="pt-5">Ricerca Ente</h1>
            <div className="row pt-4">
              <div className="col">
                <SearchInstitutions />
                <Form
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal w-100 pt-5"
                >
                  <FormGroup row className="pt-5">
                    <Col xs="12">
                      <Label htmlFor="text-input" className="active">
                        Codice iPA
                      </Label>
                      <Input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                        readOnly
                      />
                      <FormText color="muted">
                        Precompilato da IndicePA
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Nome Amministratore</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder=""
                      />
                      <FormText color="muted">
                        Precompilato da IndicePA
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Indirizzo PEC</Label>
                    </Col>
                    <Col md="9">
                      <FormGroup check className="radio">
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="radio1"
                          name="radios"
                          value="option1"
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="radio1"
                        >
                          Pec 1
                        </Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="radio2"
                          name="radios"
                          value="option2"
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="radio2"
                        >
                          Pec 2
                        </Label>
                      </FormGroup>
                      <FormGroup check className="radio">
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="radio3"
                          name="radios"
                          value="option3"
                        />
                        <Label
                          check
                          className="form-check-label"
                          htmlFor="radio3"
                        >
                          Pec 3
                        </Label>
                      </FormGroup>
                    </Col>
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
                    <Button color="primary" className="w-50" onClick={() => props.history.push("/registrazione/2")}>
                      Conferma
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>

      {/*{props.institution.institutionName} -{" "}*/}
      {/*{props.match.params.registrationStep}*/}
    </div>
  );
});
