import { BackendClient } from "../clients/api";
import { ICustomWindow } from "./customTypes/CustomWindow";

/* function to define a Backend instance with base url set */
// tslint:disable-next-line:no-any
export const baseUrlBackendClient = (token: string): any => {
  const customWindow = (window as unknown) as ICustomWindow;

  const url =
    customWindow._env_.IO_ONBOARDING_PA_API_HOST +
    ":" +
    customWindow._env_.IO_ONBOARDING_PA_API_PORT;

  return BackendClient(url, token);
};

export interface IErrorWithStatus extends Error {
  status: string;
}

/* function to manage service responses */
export const manageApiResponse = (
  response: Partial<ReturnType<typeof BackendClient>>
) => {
  if (response.isRight()) {
    switch (response.value.status) {
      case 200:
      case 201:
      case 202:
      case 204: {
        return response.value.value ? response.value.value : {};
      }
      case 400:
      case 401:
      case 403:
      case 404:
      case 409:
      case 429:
      case 500:
      case 503:
      default: {
        throw Error(response.value.status);
      }
    }
    /*in case of left, return generic error message*/
  } else {
    throw Error("500");
  }
};

/* function to manage errors */
export const manageErrors = (
  status: string,
  setAlert: () => void,
  historyPush: () => void
) => {
  if (status === "401") {
    historyPush();
  } else {
    setAlert();
  }
};
