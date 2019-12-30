import React, { ComponentProps, Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

import { AdministrationSearchParam } from "../../../generated/definitions/api/AdministrationSearchParam";
import { FiscalCode } from "../../../generated/definitions/api/FiscalCode";
import { FoundAdministration } from "../../../generated/definitions/api/FoundAdministration";
import { OrganizationFiscalCode } from "../../../generated/definitions/api/OrganizationFiscalCode";
import { OrganizationRegistrationParams } from "../../../generated/definitions/api/OrganizationRegistrationParams";
import { OrganizationRegistrationStatusEnum } from "../../../generated/definitions/api/OrganizationRegistrationStatus";
import documentCreationLoadingPageImage from "../../assets/img/document_generation.svg";
import { LoadingPageContext } from "../../context/loading-page-context";
import { LogoutModalContext } from "../../context/logout-modal-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../utils/api-utils";
import { RegistrationStepButtons } from "./RegistrationStepButtons/RegistrationStepButtons";
import { RegistrationStepOne } from "./RegistrationStepOne/RegistrationStepOne";
import { RegistrationStepThree } from "./RegistrationStepThree/RegistrationStepThree";
import { RegistrationStepTwo } from "./RegistrationStepTwo/RegistrationStepTwo";

interface IRegistrationContainerProps
  extends RouteComponentProps<{ signUpStep: string }> {
  userFiscalCode: string;
}

export const RegistrationContainer = withRouter(
  (props: IRegistrationContainerProps) => {
    /**
     * react-i18next translation hook
     */
    const { t } = useTranslation();
    const common500ErrorString = t("common.errors.genericError.500");

    const [cookies] = useCookies(["sessionToken"]);

    const loadingPageContext = useContext(LoadingPageContext);

    const alert = useAlert();

    const logoutModalContext = useContext(LogoutModalContext);

    const initialSelectedAdministration: ComponentProps<
      typeof RegistrationStepOne
    >["selectedAdministration"] = {
      fiscal_code: "" as OrganizationFiscalCode,
      ipa_code: "",
      legal_representative: {
        family_name: "",
        fiscal_code: "" as FiscalCode,
        given_name: "",
        phone_number: ""
      },
      links: [],
      name: "",
      pecs: {},
      registration_status: undefined,
      scope: undefined,
      selected_pec_label: ""
    };

    const [isVisibleConfirmModal, setIsVisibleConfirmModal] = useState(false);

    const [administrations, setAdministrations] = useState<
      ReadonlyArray<FoundAdministration>
    >([]);

    const [selectedAdministration, setSelectedAdministration] = useState({
      ...initialSelectedAdministration
    });

    const [
      isViewedDocumentsCheckboxChecked,
      setIsViewedDocumentsCheckboxChecked
    ] = useState(false);

    const isAdministrationAlreadyRegistered =
      selectedAdministration.registration_status ===
        OrganizationRegistrationStatusEnum.DRAFT ||
      selectedAdministration.registration_status ===
        OrganizationRegistrationStatusEnum.REGISTERED;

    useEffect(() => {
      if (isAdministrationAlreadyRegistered) {
        alert.info(t("common.alerts.alreadyRegisteredInstitution"));
      }
    }, [selectedAdministration.registration_status]);

    const handleAdministrationSearch = (searchString: string) => {
      const params = {
        administrationSearchParam: searchString as AdministrationSearchParam
      };
      baseUrlBackendClient(cookies.sessionToken)
        .searchPublicAdministrations({
          ...params
        })
        .then(response => {
          if (response.isRight()) {
            const respValue = response.value;
            if (respValue.status === 200) {
              const administrationsSearchResp = respValue.value;
              setAdministrations(administrationsSearchResp.administrations);
            } else {
              const alertText =
                t(`common.errors.searchAdministrations.${respValue.status}`) ||
                t(`common.errors.genericError.${respValue.status}`);
              manageErrorReturnCodes(
                respValue.status,
                () => alert.error(alertText),
                () =>
                  logoutModalContext.setLogoutModal({
                    isFromExpiredToken: true,
                    isLogoutModalVisible: true
                  })
              );
            }
          } else {
            // tslint:disable-next-line:no-console
            console.log(response.value.map(v => v.message).join(" - "));
            alert.error(common500ErrorString);
          }
        })
        .catch((error: Error) => {
          // tslint:disable-next-line:no-console
          console.log(error.message);
          alert.error(common500ErrorString);
        });
    };

    const handleAdministrationSelected = (
      event: ReadonlyArray<
        ComponentProps<typeof RegistrationStepOne>["selectedAdministration"]
      >
    ) => {
      const newAdministration =
        event.length === 0
          ? {
              fiscal_code: "" as OrganizationFiscalCode,
              ipa_code: "",
              legal_representative: {
                family_name: "",
                fiscal_code: "" as FiscalCode,
                given_name: "",
                phone_number: ""
              },
              links: [],
              name: "",
              pecs: {},
              registration_status: undefined,
              scope: undefined,
              selected_pec_label: ""
            }
          : event[0];
      setSelectedAdministration(newAdministration);
    };

    const onRegistrationStepOneSubmit = (
      formData: Parameters<
        ComponentProps<
          typeof RegistrationStepOne
        >["onRegistrationStepOneSubmit"]
      >[0]
    ) => {
      setSelectedAdministration(prevState => {
        return {
          ...prevState,
          fiscal_code: formData.cf,
          name: formData.name,
          scope: formData.organizationScope,
          selected_pec_label: formData.selectedPecLabel
        };
      });
    };

    const onRegistrationStepTwoSubmit = (
      formData: Parameters<
        ComponentProps<
          typeof RegistrationStepTwo
        >["onRegistrationStepTwoSubmit"]
      >[0]
    ) => {
      setSelectedAdministration(prevState => {
        return {
          ...prevState,
          legal_representative: {
            ...prevState.legal_representative,
            family_name: formData.familyName,
            fiscal_code: formData.fc,
            given_name: formData.givenName,
            phone_number: formData.phoneNumber
          }
        };
      });
    };

    const saveAdministration = (
      organizationRegistrationParams: OrganizationRegistrationParams
    ) => {
      const params = {
        organizationRegistrationParams
      };
      baseUrlBackendClient(cookies.sessionToken)
        .createOrganizations({
          ...params
        })
        .then(response => {
          loadingPageContext.setLoadingPage({ isVisible: false });
          if (response.isRight()) {
            const respValue = response.value;
            if (respValue.status === 201) {
              props.history.push("/sign-up/3");
            } else {
              const alertText =
                t(`common.errors.searchAdministrations.${respValue.status}`) ||
                t(`common.errors.genericError.${respValue.status}`);
              manageErrorReturnCodes(
                respValue.status,
                () => alert.error(alertText),
                () =>
                  logoutModalContext.setLogoutModal({
                    isFromExpiredToken: true,
                    isLogoutModalVisible: true
                  })
              );
            }
          } else {
            // tslint:disable-next-line:no-console
            console.log(response.value.map(v => v.message).join(" - "));
            alert.error(common500ErrorString);
          }
        })
        .catch((error: Error) => {
          // tslint:disable-next-line:no-console
          console.log(error.message);
          alert.error(common500ErrorString);
        });
      loadingPageContext.setLoadingPage({
        image: documentCreationLoadingPageImage,
        isButtonVisible: false,
        isLoadingBarVisible: true,
        isVisible: true,
        text: t("loadingPages.documentsCreation.text"),
        title: t("loadingPages.documentsCreation.title")
      });
    };

    const handleIsViewedDocumentsCheckboxChanged = () => {
      setIsViewedDocumentsCheckboxChecked(prevState => !prevState);
    };

    const toggleConfirmationModal = () => {
      setIsVisibleConfirmModal((prevState: boolean) => !prevState);
    };

    const navigateToDashboard = () => props.history.push("/dashboard");

    const registrationBody = (step => {
      switch (step) {
        case "1":
          return (
            <RegistrationStepOne
              administrations={administrations}
              onAdministrationSearch={handleAdministrationSearch}
              onAdministrationSelected={handleAdministrationSelected}
              selectedAdministration={selectedAdministration}
              openConfirmModal={toggleConfirmationModal}
              isAdministrationAlreadyRegistered={
                isAdministrationAlreadyRegistered
              }
              onRegistrationStepOneSubmit={onRegistrationStepOneSubmit}
            />
          );
        case "2":
          return (
            <RegistrationStepTwo
              selectedAdministration={selectedAdministration}
              onSaveAdministration={saveAdministration}
              openConfirmModal={toggleConfirmationModal}
              onRegistrationStepTwoSubmit={onRegistrationStepTwoSubmit}
            />
          );
        case "3":
          return (
            <RegistrationStepThree
              selectedAdministration={selectedAdministration}
              userFiscalCode={props.userFiscalCode}
              isViewedDocumentsCheckboxChecked={
                isViewedDocumentsCheckboxChecked
              }
              onIsViewedDocumentsCheckboxChanged={
                handleIsViewedDocumentsCheckboxChanged
              }
              openConfirmModal={toggleConfirmationModal}
            />
          );
      }
    })(props.match.params.signUpStep);

    const rightColumnContent = (step => {
      switch (step) {
        case "1":
          return (
            <Fragment>
              <p className="pr-3 mt-5">{t("signUp.rightCol.title")}</p>
              <p className="small pr-3">{t("signUp.rightCol.text")}</p>
              <p className="small pr-2">
                {t("common.links.ipa.text")}&nbsp;
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={t("common.links.ipa.link")}
                >
                  {t("common.links.ipa.textLink")}
                </a>
              </p>
            </Fragment>
          );
        case "2":
        case "3":
          return null;
      }
    })(props.match.params.signUpStep);

    return (
      <div className="RegistrationContainer">
        <Container fluid={true}>
          <Row>
            <Col sm="2">
              <RegistrationStepButtons
                openConfirmModal={toggleConfirmationModal}
              />
            </Col>
            <Col sm="8">{registrationBody}</Col>
            <Col sm="2">
              <Row>
                <Col>{rightColumnContent}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={isVisibleConfirmModal} toggle={toggleConfirmationModal}>
          <ModalHeader toggle={toggleConfirmationModal}>
            {t("signUp.backModal.title")}
          </ModalHeader>
          <ModalBody className="pt-4">
            <p>{t("signUp.backModal.text")}</p>
            <p>{t("signUp.backModal.additionalText")}</p>
          </ModalBody>
          <ModalFooter>
            <Row className="w-100 pt-4">
              <Col sm="6" className="text-left">
                <Button
                  outline={true}
                  color="secondary"
                  onClick={toggleConfirmationModal}
                >
                  {t("common.buttons.cancel")}
                </Button>
              </Col>
              <Col sm="6" className="text-right">
                <Button
                  color="primary"
                  className="btn btn-primary"
                  onClick={navigateToDashboard}
                >
                  {t("common.buttons.confirm")}
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
);
