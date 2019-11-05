import React, { ChangeEvent, useState } from "react";
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

interface IAddMailModalProps {
  showAddMailModal: boolean;
  toggleAddMailModal: () => void;
}

/*
 * Modal shown at first login to prompt user to add personal mail
 */
export const AddMailModal = (props: IAddMailModalProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const [newMail, setNewMail] = useState("");
  const [confirmMail, setConfirmMail] = useState("");

  const onChangeNewMailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMail(event.target.value);
  };

  const onChangeConfirmMailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmMail(event.target.value);
  };

  return (
    <Modal isOpen={props.showAddMailModal} centered={true} size="lg">
      <ModalHeader>
        <p className="h4 pt-4 px-4">{t("common.modals.addMail.title")}</p>
      </ModalHeader>
      <ModalBody className="pt-4">
        <p className="px-4">{t("common.modals.addMail.text")}</p>
        <Form
          action=""
          method="post"
          encType="multipart/form-data"
          className="form-horizontal w-100 pt-4 px-4"
        >
          <FormGroup row={true}>
            <Col sm="4 pl-0">
              <Label htmlFor="new_mail-input">
                {t("common.modals.addMail.inputs.newMailLabel")}
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
                {t("common.modals.addMail.inputs.confirmNewMailLabel")}
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
              /*TODO: aggiungere chiamata al servizio per salvataggio mail sull'onClick - story https://www.pivotaltracker.com/story/show/168752431*/
              onClick={props.toggleAddMailModal}
            >
              {t("common.buttons.skip")}
            </Button>
          </Col>
          <Col sm="6" className="text-right">
            <Button
              color="primary"
              className="btn btn-primary"
              /*TODO: aggiungere chiamata al servizio per salvataggio mail sull'onClick e attivazione tasto - stories https://www.pivotaltracker.com/story/show/168752431 e https://www.pivotaltracker.com/story/show/168752421*/
              onClick={props.toggleAddMailModal}
            >
              {t("common.buttons.confirm")}
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </Modal>
  );
};
