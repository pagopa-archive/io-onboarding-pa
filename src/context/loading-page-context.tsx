import React, { createContext, ReactNode, useState } from "react";

interface ILoadingPage {
  image: string;
  title: string;
  text: string;
  isLoadingBarVisible: boolean;
  isButtonVisible: boolean;
  buttonText?: string;
  buttonFunction?: () => void;
}

interface ILoadingPageContext {
  setLoadingPage: (loadingModal: ILoadingPage) => void;
  loadingPage: ILoadingPage;
}

/**
 * Alert context to show or not an alert for certain events or operations
 */
export const LoadingPageContext = createContext<ILoadingPageContext>({
  loadingPage: {
    image: "",
    isButtonVisible: false,
    isLoadingBarVisible: false,
    text: "",
    title: ""
  },
  setLoadingPage: () => {
    return;
  }
});

/**
 * Loading modal context provider component to set loading modal attributes in the app
 */
export const LoadingPageContextProvider = (props: { children: ReactNode }) => {
  const [loadingPage, setLoadingPage] = useState({
    image: "",
    isButtonVisible: false,
    isLoadingBarVisible: false,
    text: "",
    title: ""
  });

  return (
    <LoadingPageContext.Provider value={{ loadingPage, setLoadingPage }}>
      {props.children}
    </LoadingPageContext.Provider>
  );
};
