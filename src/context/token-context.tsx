import React, { createContext, ReactNode, useState } from "react";

interface ITokenContext {
  setToken: (tokenValue: string) => void;
  token: string;
}

interface ITokenContextProvider extends ITokenContext {
  children: ReactNode;
}

/**
 * Token context to save token for apis calls
 */
export const TokenContext = createContext<ITokenContext>({
  setToken: () => {
    return;
  },
  token: ""
});

/**
 * Token context provider component to use token in the app
 */
export const TokenContextProvider = (props: ITokenContextProvider) => {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ setToken, token }}>
      {props.children}
    </TokenContext.Provider>
  );
};
