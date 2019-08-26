import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

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
  const options: ReadonlyArray<{ login: string }> = [
    { login: "ACAC" },
    { login: "B" },
    { login: "CLLL" }
  ];

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <div className="RegistrationStepOne">
      {props.institution.institutionName} -{" "}
      {props.match.params.registrationStep}
      <AsyncTypeahead
        allowNew={false}
        isLoading={false}
        multiple={false}
        options={options}
        labelKey="login"
        minLength={3}
        onSearch={handleSearch}
        placeholder="Search for a string..."
      />
    </div>
  );
});
