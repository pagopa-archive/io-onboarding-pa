import * as React from "react";
import { AppHeader } from "@coreui/react";
import { Nav, NavItem } from "reactstrap";

import "./SlimHeader.css";

export const SlimHeader: React.FC = () => {
  return (
    <AppHeader
      fixed
      className="SlimHeader it-header-slim-wrapper border-bottom-0 position-fixed w-100"
    >
      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <a className="white-color ml-3" href="#">
            PagoPa SPA
          </a>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <NavItem className="px-3">
          <a className="white-color mr-3" href="#">
            Progetto IO
          </a>
        </NavItem>
      </Nav>
    </AppHeader>
  );
};
