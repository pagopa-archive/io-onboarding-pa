import React, { createContext, useState } from "react";

export const TokenContext = createContext({
  setToken: (tokenValue: string) => {
    return;
  },
  token: ""
});

export const TokenContextProvider = props => {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ setToken, token }}>
      {props.children}
    </TokenContext.Provider>
  );
};
