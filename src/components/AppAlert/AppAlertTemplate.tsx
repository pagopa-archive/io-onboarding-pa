import React from "react";
import { AlertComponentPropsWithStyle, types } from "react-alert";
import { Alert } from "reactstrap";
import "./AppAlert.css";

export const AppAlertTemplate = ({
  style,
  options,
  message,
  close
}: AlertComponentPropsWithStyle) => (
  <div style={style} className="AppAlert">
    <Alert
      // fix for different names: bootstrap uses "danger", react-alert uses "error"
      color={options.type === types.ERROR ? "danger" : options.type}
      toggle={close}
      className="mt-2 mb-0"
    >
      {message}
    </Alert>
  </div>
);
