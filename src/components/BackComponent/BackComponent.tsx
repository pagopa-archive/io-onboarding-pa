import * as React from "react";
import { withRouter } from "react-router";

export const BackComponent = withRouter(props => {
  console.log(props);

  return <div>{props.match.params.registrationStep}</div>;
});
