import { Dispatch, SetStateAction, useEffect } from "react";
import * as React from "react";

interface IUserSettingsProps {
  userProfile: {
    email: string;
    fiscalCode: string;
    name: string;
    role: string;
  };
}

export const UserSettings: React.FC<IUserSettingsProps> = props => {
  return <div></div>;
};
