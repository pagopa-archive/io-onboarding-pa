import { BackendClient } from "../clients/api";
import { ICustomWindow } from "./customTypes/CustomWindow";

/* function to define a Backend instance with base url set */
export const baseUrlBackendClient = (token: string) => {
  const customWindow = (window as unknown) as ICustomWindow;

  const url =
    customWindow._env_.IO_ONBOARDING_PA_API_HOST +
    ":" +
    customWindow._env_.IO_ONBOARDING_PA_API_PORT;
  return BackendClient(url, token);
};

/* function to manage errors */
export const manageErrorReturnCodes = (
  status: number,
  setAlert: () => void,
  historyPush: () => void
) => {
  // with status 401 we have an expired token -> user needs to be logged out to perform login again and get new token
  if (status === 401) {
    historyPush();
  } else {
    setAlert();
  }
};

export const manageIsLeftOrUnknownError = (
  message: string,
  setAlert: () => void
) => {
  // tslint:disable-next-line:no-console
  console.log(message);
  setAlert();
};
