import React, { createContext, ReactNode, useState } from "react";

interface ILogoutModal {
  isLogoutModalVisible: boolean;
  isFromExpiredToken: boolean;
}

interface ILogoutModalContext {
  setLogoutModal: (logoutModal: ILogoutModal) => void;
  logoutModal: ILogoutModal;
}

/**
 * Alert context to show or not an alert for certain events or operations
 */
export const LogoutModalContext = createContext<ILogoutModalContext>({
  logoutModal: { isLogoutModalVisible: false, isFromExpiredToken: false },
  setLogoutModal: () => {
    return;
  }
});

/**
 * Alert context provider component to use alert in the app
 */
export const LogoutModalContextProvider = (props: { children: ReactNode }) => {
  const [logoutModal, setLogoutModal] = useState({
    isFromExpiredToken: false,
    isLogoutModalVisible: false
  });

  return (
    <LogoutModalContext.Provider value={{ setLogoutModal, logoutModal }}>
      {props.children}
    </LogoutModalContext.Provider>
  );
};
