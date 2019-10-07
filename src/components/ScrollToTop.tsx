import React, { Fragment, ReactNode, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface IScrollToTopProps extends RouteComponentProps {
  children: ReactNode;
}

export const ScrollToTop = withRouter((props: IScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <Fragment>{props.children}</Fragment> || null;
});
