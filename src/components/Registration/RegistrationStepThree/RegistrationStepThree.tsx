import * as FileSaver from "file-saver";
import React, { ComponentProps, Fragment, MouseEvent, useContext } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router-dom";
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
import logoSignupStepThree from "../../../assets/img/signup_step3.svg";
import { AlertContext } from "../../../context/alert-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../../utils/api-utils";
import { ICustomWindow } from "../../../utils/customTypes/CustomWindow";
import { SearchAdministrations } from "../RegistrationStepOne/SearchAdministrations";

interface IRegistrationStepThreeProps extends RouteComponentProps {
  selectedAdministration: ComponentProps<
    typeof SearchAdministrations
  >["selectedAdministration"];
  userFiscalCode: string;
  isViewedDocumentsCheckboxChecked: boolean;
  onIsViewedDocumentsCheckboxChanged: () => void;
}

/*
 * Create sections to download documents
 */

interface IDocumentInfo {
  documentType: string;
  documentName: string;
}

interface IDocumentDownloadSectionProps
  extends RouteComponentProps,
    IDocumentInfo {
  ipaCode: string;
  cookie: string;
  showGenericErrorAlert: () => void;
}

const DownloadDocsSection = (props: IDocumentDownloadSectionProps) => {
  /**
   * Create window with custom element _env_ for environment variables
   */
  const customWindow = (window as unknown) as ICustomWindow;

  const urlDomainPort =
    customWindow._env_.IO_ONBOARDING_PA_API_HOST +
    ":" +
    customWindow._env_.IO_ONBOARDING_PA_API_PORT;

  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const downloadDocument = () => (_: MouseEvent) => {
    const url =
      urlDomainPort +
      `/organizations/${props.ipaCode}/documents/${props.documentName}`;
    // TODO: use generated classes for api when binary files are avaliable (tracked in story https://www.pivotaltracker.com/story/show/169818047)
    fetch(url, {
      headers: {
        Authorization: `Bearer ${props.cookie}`
      },
      method: "GET"
    })
      .then(response => response.blob())
      .then(blob => FileSaver.saveAs(blob, props.documentName))
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        props.showGenericErrorAlert();
      });
  };

  return (
    <Fragment>
      <Row className="pt-5">
        <Col>
          <h4>{t(`signUp.stepThree.${props.documentType}.title`)}</h4>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col>
          <p>{t(`signUp.stepThree.${props.documentType}.description`)}</p>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col>
          <Button outline={true} color="primary" onClick={downloadDocument()}>
            {t("common.buttons.viewDocument")}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

/**
 * Component for third step of registration process
 */
export const RegistrationStepThree = withRouter(
  (props: IRegistrationStepThreeProps) => {
    /**
     * react-i18next translation hook
     */
    const { t } = useTranslation();

    const [cookies] = useCookies(["sessionToken"]);

    const alertContext = useContext(AlertContext);
    const showGenericErrorAlert = () => {
      alertContext.setAlert({
        alertColor: "danger",
        alertText: t("common.errors.genericError.500"),
        showAlert: true
      });
    };

    /**
     * array containing two documents download sections props
     */
    const downloadDocsSectionsDataArray: ReadonlyArray<IDocumentInfo> = [
      {
        documentName: "contract.pdf",
        documentType: "contract"
      },
      {
        documentName: `mandate-${props.userFiscalCode.toLowerCase()}.pdf`,
        documentType: "mandate"
      }
    ];

    const downloadDocsSections = downloadDocsSectionsDataArray.map(
      downloadDocSection => (
        <DownloadDocsSection
          {...props}
          key={downloadDocSection.documentType}
          documentType={downloadDocSection.documentType}
          documentName={downloadDocSection.documentName}
          ipaCode={props.selectedAdministration.ipa_code}
          cookie={cookies.sessionToken}
          showGenericErrorAlert={showGenericErrorAlert}
        />
      )
    );

    const onSendDocuments = () => {
      const params = {
        ipaCode: props.selectedAdministration.ipa_code as string
      };
      baseUrlBackendClient(cookies.sessionToken)
        .sendDocuments({
          ...params
        })
        .then(response => {
          if (response.isRight()) {
            const respValue = response.value;
            if (respValue.status === 204) {
              props.history.push("/dashboard");
              alertContext.setAlert({
                alertColor: "warning",
                alertText: t("common.alerts.documentsSent"),
                showAlert: true
              });
            } else {
              const alertText = t(
                `common.errors.sendDocuments.${respValue.status}`
              )
                ? t(`common.errors.sendDocuments.${respValue.status}`)
                : t(`common.errors.genericError.${respValue.status}`);
              manageErrorReturnCodes(
                respValue.status,
                () =>
                  alertContext.setAlert({
                    alertColor: "danger",
                    alertText,
                    showAlert: true
                  }),
                () => props.history.push("/home")
              );
            }
          } else {
            // tslint:disable-next-line:no-console
            console.log(response.value.map(v => v.message).join(" - "));
            showGenericErrorAlert();
          }
        })
        .catch((error: Error) => {
          // tslint:disable-next-line:no-console
          console.log(error.message);
          showGenericErrorAlert();
        });
    };

    return (
      <div className="RegistrationStepThree">
        <Container fluid={true}>
          <Row>
            <Col sm="10">
              <Row>
                <Col sm="11">
                  <h1 className="pt-5">{t("signUp.stepThree.title")}</h1>
                  <Row className="pt-3">
                    <Col>
                      <p>{t("signUp.stepThree.description")}</p>
                    </Col>
                  </Row>
                  <Row className="pt-2">
                    <Col>
                      <p>{t("signUp.stepThree.additionalDescription")}</p>
                    </Col>
                  </Row>
                  {downloadDocsSections}
                  <Form className="pt-5">
                    <FormGroup check={true}>
                      <Input
                        type="checkbox"
                        name="document-confirm-check"
                        id="documentConfirm"
                        checked={props.isViewedDocumentsCheckboxChecked}
                        onChange={props.onIsViewedDocumentsCheckboxChanged}
                      />
                      <Label for="documentConfirm" check={true}>
                        {t("signUp.stepThree.checkboxLabel")}
                      </Label>
                    </FormGroup>
                  </Form>
                  <Row className="pt-5 pb-5">
                    <Col size={6} className="text-left">
                      <Button outline={true} color="secondary" className="w-50">
                        {t("common.buttons.cancel")}
                      </Button>
                    </Col>
                    <Col size={6} className="text-right">
                      <Button
                        color="primary"
                        className="w-50"
                        disabled={!props.isViewedDocumentsCheckboxChecked}
                        onClick={onSendDocuments}
                      >
                        {t("common.buttons.confirm")}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm="2">
              <Media
                object={true}
                src={logoSignupStepThree}
                alt="Signup step one logo"
                className="pt-5 w-75"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);
