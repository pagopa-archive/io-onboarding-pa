import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface IRegistrationStepOneCustomProps {
  institution: {
    institutionName: string;
    institutionFiscalCode: string;
    institutionAdminName: string;
    institutionPecs: ReadonlyArray<string>;
    institutionLegalRepName: string;
    institutionLegalRepSurname: string;
    institutionLegalRepCf: string;
  };
}

interface IPathParams {
  registrationStep: string;
}

interface IRegistrationStepOneProps
  extends IRegistrationStepOneCustomProps,
    RouteComponentProps<IPathParams> {}

export const RegistrationStepOne = withRouter<
  IRegistrationStepOneProps,
  React.FC<IRegistrationStepOneProps>
>((props: IRegistrationStepOneProps) => {
  return (
    <div className="RegistrationStepOne">
      {props.institution.institutionName} - {props.match.params.registrationStep}

    </div>
  );
});
