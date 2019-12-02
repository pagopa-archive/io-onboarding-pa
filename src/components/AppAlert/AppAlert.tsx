import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    if (alertContext.alert.showAlert) {
      const alertTimeout = setTimeout(
        () =>
          alertContext.setAlert({ ...alertContext.alert, showAlert: false }),
        10000
      );
      return () => clearTimeout(alertTimeout);
    }
  }, [alertContext.alert.showAlert]);

  useEffect(() => {
    alertContext.setAlert({ ...alertContext.alert, showAlert: false });
  }, [location.pathname]);

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
