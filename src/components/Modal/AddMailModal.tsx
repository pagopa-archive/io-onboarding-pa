import { NonEmptyString } from "italia-ts-commons/lib/strings";
import React, { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
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
import { ICustomWindow } from "../../customTypes/CustomWindow";

interface IAddMailModalProps {
  isVisibleAddMailModal: boolean;
  toggleAddMailModal: () => void;
  spidMail: EmailAddress;
  workMail?: EmailAddress;
  onWorkMailSet: (newUserMail: EmailAddress) => void;
}

/*
 * Modal shown at first login to prompt user to add personal mail
 */
export const AddMailModal = (props: IAddMailModalProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  /**
   * Create window with custom element _env_ for environment variables
   */
  const customWindow = (window as unknown) as ICustomWindow;

  const urlDomainPort =
    customWindow._env_.IO_ONBOARDING_PA_API_HOST +
    ":" +
    customWindow._env_.IO_ONBOARDING_PA_API_PORT;

  const contentType = "application/json";

  const [cookies] = useCookies(["sessionToken"]);
  const alertContext = useContext(AlertContext);

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
    const url = urlDomainPort + `/profile`;
    fetch(url, {
      body: JSON.stringify({ work_email: newUserMail as EmailAddress }),
      headers: {
        Accept: contentType,
        Authorization: `Bearer ${cookies.sessionToken}`,
        "Content-Type": contentType
      },
      method: "PUT"
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        props.onWorkMailSet(newUserMail as EmailAddress);
        props.toggleAddMailModal();
        alertContext.setAlert({
          alertColor: "info",
          alertText: alertMessage,
          showAlert: true
        });
        setNewMail("");
        setConfirmMail("");
      })
      .catch(error => {
        return error;
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
};
