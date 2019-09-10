import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

import "./BackComponent.css";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

interface IBackComponentCustomProps {
  openConfirmModal: () => void;
}

interface IPathParams {
  registrationStep: string;
}

interface IBackComponentProps
  extends IBackComponentCustomProps,
    RouteComponentProps<IPathParams> {}

export const BackComponent = withRouter<
  IBackComponentProps,
  React.FC<IBackComponentProps>
  >((props: IBackComponentProps) => {
  // Go to selected step
  const goToStep = (step: number) => {
    return step === 0
      ? props.openConfirmModal()
      : props.history.push("/registrazione/" + step);
  };

  // Create three button elements with step numbers from 1 to 3
  // current step is highlighted with class btn-link
  // previous step buttons can be clicked to go to selected step
  const backButtons = [...Array(4).keys()].slice(1).map(el => (
    <button
      key={el}
      type="button"
      onClick={() => goToStep(el)}
      className={`btn btn-outline-secondary btn-xs 
      ${el.toString() === props.match.params.registrationStep ? "btn-link" : ""}
      ${
        el >= parseInt(props.match.params.registrationStep, 10)
          ? "step-button"
          : ""
        }
      `}
    >
      {el}
    </button>
  ));

  return (
    <div className="BackComponent pl-4">
      <div className="row">
        <div className="col">
          <button
            className="btn btn-link btn-icon mt-5 pl-0"
            onClick={() =>
              goToStep(parseInt(props.match.params.registrationStep, 10) - 1)
            }
          >
            <svg className="icon icon-primary">
              <use xlinkHref={`${bootstrapItaliaImages}#it-chevron-left`} />
            </svg>
            <span>Torna indietro</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="btn-group" role="group">
            {backButtons}
          </div>
        </div>
      </div>
    </div>
  );
});
