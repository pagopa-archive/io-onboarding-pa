import React, { useContext } from "react";
import { Alert } from "reactstrap";

import { AlertContext } from "../../context/alert-context";

import "./AppAlert.css";

/**
 * Component that returns an alert on certain events
 */
export const AppAlert = () => {
  const alertContext = useContext(AlertContext);

  const onDismiss = () => {
    alertContext.setAlert({ ...alertContext.alert, showAlert: false });
  };

  return (
    <div className="AppAlert mx-auto">
      <Alert
        color={alertContext.alert.alertColor}
        isOpen={alertContext.alert.showAlert}
        toggle={onDismiss}
      >
        {alertContext.alert.alertText}
      </Alert>
    </div>
  );
};
