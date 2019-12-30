import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Button } from "reactstrap";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

interface IBackButtonProps extends RouteComponentProps {
  path: string;
  text: string;
  additionalClasses: string;
  showModalbBackConfirm?: () => void;
}

/**
 * Component for first step of registration process
 */
export const BackButton = withRouter((props: IBackButtonProps) => {
  const navigateBack = () => {
    return props.showModalbBackConfirm
      ? props.showModalbBackConfirm()
      : props.history.push(props.path);
  };

  return (
    <Button
      color="link"
      className={`btn-icon ${props.additionalClasses}`}
      onClick={navigateBack}
    >
      <svg className="icon icon-primary">
        <use xlinkHref={`${bootstrapItaliaImages}#it-chevron-left`} />
      </svg>
      <span>{props.text}</span>
    </Button>
  );
});
