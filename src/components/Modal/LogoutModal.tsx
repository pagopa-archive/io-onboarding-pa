import React, { MouseEvent, useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { Trans, useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import logoutLogo from "../../assets/img/logout.svg";
import { LogoutModalContext } from "../../context/logout-modal-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../utils/api-utils";
import { getConfig } from "../../utils/config";

/*
 * Modal shown at first login to prompt user to add personal mail
 */
export const LogoutModal = withRouter(props => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const [cookies, , removeCookie] = useCookies(["sessionToken"]);
  const alert = useAlert();
  const logoutModalContext = useContext(LogoutModalContext);

  const toggleLogoutModal = (isFromExpiredToken: boolean) => (
    _: MouseEvent
  ) => {
    const isLogoutModalVisible = !logoutModalContext.logoutModal
      .isLogoutModalVisible;
    logoutModalContext.setLogoutModal({
      isFromExpiredToken,
      isLogoutModalVisible
    });
  };

  useEffect(() => {
    if (logoutModalContext.logoutModal.isFromExpiredToken) {
      setTimeout(() => {
        logoutModalContext.setLogoutModal({
          isFromExpiredToken: false,
          isLogoutModalVisible: false
        });
        removeCookie("sessionToken", {
          domain: getConfig("IO_ONBOARDING_PA_SESSION_TOKEN_DOMAIN")
        });
        props.history.push("/home");
      }, 8000);
    }
  }, [logoutModalContext.logoutModal.isFromExpiredToken]);

  const logout = () => {
    baseUrlBackendClient(cookies.sessionToken)
      .logout({})
      .then(response => {
        logoutModalContext.setLogoutModal({
          isFromExpiredToken: false,
          isLogoutModalVisible: false
        });
        if (response.isRight()) {
          const respValue = response.value;
          if (respValue.status === 204) {
            removeCookie("sessionToken", {
              domain: getConfig("IO_ONBOARDING_PA_SESSION_TOKEN_DOMAIN")
            });
            props.history.push("/home");
          } else {
            const alertText =
              t(`common.errors.logout.${respValue.status}`) ||
              t(`common.errors.genericError.${respValue.status}`);
            manageErrorReturnCodes(
              respValue.status,
              () => alert.error(alertText),
              () => {
                removeCookie("sessionToken", {
                  domain: getConfig("IO_ONBOARDING_PA_SESSION_TOKEN_DOMAIN")
                });
                props.history.push("/home");
              }
            );
          }
        } else {
          // tslint:disable-next-line:no-console
          console.log(response.value.map(v => v.message).join(" - "));
          alert.error(t("common.errors.genericError.500"));
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        alert.error(t("common.errors.genericError.500"));
      });
  };

  return (
    <Modal
      isOpen={logoutModalContext.logoutModal.isLogoutModalVisible}
      centered={true}
      size="lg"
    >
      <ModalHeader>
        <p className="h4 pt-4 px-4">{t(`common.modals.logout.title`)}</p>
      </ModalHeader>
      <ModalBody className="pt-4">
        <p className="px-4">
          <Trans i18nKey="multiline">
            {logoutModalContext.logoutModal.isFromExpiredToken
              ? t(`common.modals.logout.isFromExpiredToken.text`)
              : t(`common.modals.logout.isUserTriggered.text`)}
          </Trans>
        </p>
        <Row className="justify-content-center mt-5 mb-4">
          <Col sm="auto">
            <Media object={true} src={logoutLogo} alt="Logout" height="200" />
          </Col>
        </Row>
      </ModalBody>
      {logoutModalContext.logoutModal.isFromExpiredToken ? null : (
        <ModalFooter>
          <Row className="w-100 p-3">
            <Col sm="6" className="text-left pl-0">
              <Button
                outline={true}
                color="secondary"
                onClick={toggleLogoutModal(false)}
              >
                {t("common.buttons.cancel")}
              </Button>
            </Col>
            <Col sm="6" className="text-right">
              <Button
                color="primary"
                className="btn btn-primary"
                onClick={logout}
              >
                {t("common.buttons.logoutConfirm")}
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      )}
    </Modal>
  );
});
