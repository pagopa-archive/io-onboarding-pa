import React, { createContext, ReactNode, useState } from "react";

interface IAlert {
  showAlert: boolean;
  alertColor: string;
  alertText: string;
}

interface IAlertContext {
  setAlert: (alert: IAlert) => void;
  alert: IAlert;
}

/**
 * Alert context to show or not an alert for certain events or operations
 */
export const AlertContext = createContext<IAlertContext>({
  alert: { showAlert: false, alertColor: "", alertText: "" },
  setAlert: () => {
    return;
  }
});

/**
 * Token context provider component to use token in the app
 */
export const AlertContextProvider = (props: { children: ReactNode }) => {
  const [alert, setAlert] = useState({
    alertColor: "",
    alertText: "",
    showAlert: false
  });

  return (
    <AlertContext.Provider value={{ setAlert, alert }}>
      {props.children}
    </AlertContext.Provider>
  );
};
