import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface IRegistrationStepOneCustomProps {
  prova?: string;
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
    <div>
      {props.prova} - {props.match.params.registrationStep}
    </div>
  );
});
