import React, { Fragment, ReactNode, useContext, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { AlertContext } from "../context/alert-context";

interface IScrollToTopProps extends RouteComponentProps {
  children: ReactNode;
}

export const ScrollToTop = withRouter((props: IScrollToTopProps) => {
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, alertContext.alert.showAlert]);

  return <Fragment>{props.children}</Fragment>;
});
