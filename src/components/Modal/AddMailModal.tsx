import { NonEmptyString } from "italia-ts-commons/lib/strings";
import React, { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import { EmailAddress } from "../../../generated/definitions/api/EmailAddress";
import { AlertContext } from "../../context/alert-context";
import { LogoutModalContext } from "../../context/logout-modal-context";
import {
  baseUrlBackendClient,
  manageErrorReturnCodes
} from "../../utils/api-utils";

interface IAddMailModalProps extends RouteComponentProps {
  isVisibleAddMailModal: boolean;
  toggleAddMailModal: () => void;
  spidMail: EmailAddress;
  workMail?: EmailAddress;
  onWorkMailSet: (newUserMail: EmailAddress) => void;
}

/*
 * Modal shown at first login to prompt user to add personal mail
 */
export const AddMailModal = withRouter((props: IAddMailModalProps) => {
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
  const logoutModalContext = useContext(LogoutModalContext);

  const [newMail, setNewMail] = useState("");
  const [confirmMail, setConfirmMail] = useState("");

  /*
   * Boolean variable to check if a work email different from spid one is already set
   * */
  const isWorkMailNotSet = !props.workMail || props.workMail === props.spidMail;

  // If a work mail different from spid one is already set, user in changing work email
  // otherwise is adding work mail
  const workMailOperationType = isWorkMailNotSet
    ? "addWorkMail"
    : "changeWorkMail";

  const onChangeNewMailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMail(event.target.value);
  };

  const onChangeConfirmMailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmMail(event.target.value);
  };

  const updateUserMail = (newUserMail: string, alertMessage: string) => (
    _: MouseEvent
  ) => {
    const params = {
      updateUserProfile: { work_email: newUserMail as EmailAddress }
    };
    baseUrlBackendClient(cookies.sessionToken)
      .updateProfile({
        ...params
      })
      .then(response => {
        if (response.isRight()) {
          const respValue = response.value;
          if (respValue.status === 200) {
            props.onWorkMailSet(newUserMail as EmailAddress);
            props.toggleAddMailModal();
            alertContext.setAlert({
              alertColor: "info",
              alertText: alertMessage,
              showAlert: true
            });
            setNewMail("");
            setConfirmMail("");
          } else {
            const alertText = t(
              `common.errors.updateUserMail.${respValue.status}`
            )
              ? t(`common.errors.updateUserMail.${respValue.status}`)
              : t(`common.errors.genericError.${respValue.status}`);
            manageErrorReturnCodes(
              respValue.status,
              () =>
                alertContext.setAlert({
                  alertColor: "danger",
                  alertText,
                  showAlert: true
                }),
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
    <Modal isOpen={props.isVisibleAddMailModal} centered={true} size="lg">
      <ModalHeader>
        <p className="h4 pt-4 px-4">
          {t(`common.modals.${workMailOperationType}.title`)}
        </p>
      </ModalHeader>
      <ModalBody className="pt-4">
        <p className="px-4">
          {t(`common.modals.${workMailOperationType}.text`)}
        </p>
        <Form
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal w-100 pt-4 px-4"
        >
          <FormGroup row={true}>
            <Col sm="4 pl-0">
              <Label htmlFor="new_mail-input">
                {t(
                  `common.modals.${workMailOperationType}.inputs.newMailLabel`
                )}
              </Label>
            </Col>
            <Col sm="7">
              <Input
                type="text"
                id="new_mail-input"
                name="new_mail"
                placeholder=""
                value={newMail}
                onChange={onChangeNewMailInput}
              />
            </Col>
          </FormGroup>
          <FormGroup row={true}>
            <Col sm="4 pl-0">
              <Label htmlFor="confirm_mail-input">
                {t(
                  `common.modals.${workMailOperationType}.inputs.confirmNewMailLabel`
                )}
              </Label>
            </Col>
            <Col sm="7">
              <Input
                type="text"
                id="confirm_mail-input"
                name="confirm_mail"
                placeholder=""
                value={confirmMail}
                onChange={onChangeConfirmMailInput}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Row className="w-100 p-3">
          <Col sm="6" className="text-left pl-0">
            <Button
              outline={true}
              color="secondary"
              onClick={
                isWorkMailNotSet
                  ? updateUserMail(
                      props.spidMail,
                      t("common.alerts.setMailWithSpidMail")
                    )
                  : props.toggleAddMailModal
              }
            >
              {isWorkMailNotSet
                ? t("common.buttons.skip")
                : t("common.buttons.cancel")}
            </Button>
          </Col>
          <Col sm="6" className="text-right">
            <Button
              color="primary"
              className="btn btn-primary"
              disabled={!NonEmptyString.is(newMail) || newMail !== confirmMail}
              onClick={updateUserMail(
                newMail,
                `${t("common.alerts.setMailWithNewMail")} ${
                  isWorkMailNotSet
                    ? t("common.alerts.setMailWithNewMailAdditionalInfo")
                    : ""
                }`
              )}
            >
              {t("common.buttons.confirm")}
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
});
