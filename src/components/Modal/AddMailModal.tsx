import React, { MouseEvent, useContext } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import useForm from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormFeedback,
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

// Types for form input
interface IChangeMailFormData {
  newMail: EmailAddress;
  confirmMail: EmailAddress;
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
  const alert = useAlert();
  const logoutModalContext = useContext(LogoutModalContext);

  const { register, handleSubmit, getValues, errors } = useForm<
    IChangeMailFormData
  >();

  /*
   * Boolean variable to check if a work email different from spid one is already set
   * */
  const isWorkMailNotSet = !props.workMail || props.workMail === props.spidMail;

  // If a work mail different from spid one is already set, user in changing work email
  // otherwise is adding work mail
  const workMailOperationType = isWorkMailNotSet
    ? "addWorkMail"
    : "changeWorkMail";

  const isModalFromProfilePage = props.location.pathname === "/profile";

  const updateUserMail = (newUserMail: string, alertMessage: string) => {
    const params = {
      updateUserProfile: { work_email: newUserMail as EmailAddress }
    };
    baseUrlBackendClient(cookies.sessionToken)
      .updateProfile({
        ...params
      })
      .then(response => {
        props.toggleAddMailModal();
        if (response.isRight()) {
          const respValue = response.value;
          if (respValue.status === 200) {
            props.onWorkMailSet(newUserMail as EmailAddress);
            alert.success(alertMessage);
          } else {
            const alertText = t(
              `common.errors.updateUserMail.${respValue.status}`
            )
              ? t(`common.errors.updateUserMail.${respValue.status}`)
              : t(`common.errors.genericError.${respValue.status}`);
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
          alert.error(t("common.errors.genericError.500"));
        }
      })
      .catch((error: Error) => {
        // tslint:disable-next-line:no-console
        console.log(error.message);
        alert.error(t("common.errors.genericError.500"));
      });
  };

  const onSubmit = handleSubmit(formData => {
    updateUserMail(
      formData.newMail,
      `${t("common.alerts.setMailWithNewMail")} ${
        !isModalFromProfilePage
          ? t("common.alerts.setMailWithNewMailAdditionalInfo")
          : ""
      }`
    );
    return;
  });

  const onCancelUpdateMail = (newUserMail: string, alertMessage: string) => (
    _: MouseEvent
  ) => {
    updateUserMail(newUserMail, alertMessage);
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
        <Form className="form-horizontal w-100 pt-4 px-4">
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
                name="newMail"
                id="new_mail-input"
                placeholder=""
                innerRef={register({
                  required: `${t("common.inputs.errors.requiredField")}`,
                  validate: value =>
                    EmailAddress.is(value) ||
                    `${t("common.inputs.errors.invalidEmail")}`
                })}
                invalid={errors.newMail !== undefined}
              />
              <FormFeedback>
                {errors.newMail && errors.newMail.message}
              </FormFeedback>
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
                name="confirmMail"
                placeholder=""
                innerRef={register({
                  required: `${t("common.inputs.errors.requiredField")}`,
                  validate: value =>
                    value === getValues().newMail ||
                    `${t("common.inputs.errors.differentConfirmMail")}`
                })}
                invalid={errors.confirmMail !== undefined}
              />
              <FormFeedback>
                {errors.confirmMail && errors.confirmMail.message}
              </FormFeedback>
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
                !isModalFromProfilePage
                  ? onCancelUpdateMail(
                      props.spidMail,
                      t("common.alerts.setMailWithSpidMail")
                    )
                  : props.toggleAddMailModal
              }
            >
              {!isModalFromProfilePage
                ? t("common.buttons.skip")
                : t("common.buttons.cancel")}
            </Button>
          </Col>
          <Col sm="6" className="text-right">
            <Button
              type="submit"
              color="primary"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              {t("common.buttons.confirm")}
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
});
