import { AppHeader } from "@coreui/react";
import React from "react";
import { Container, Nav, NavItem } from "reactstrap";

import "./SlimHeader.css";

/**
 * Slim header at top of the app
 */
export const SlimHeader = () => {
  return (
    <AppHeader
      fixed
      className="SlimHeader it-header-slim-wrapper border-bottom-0 w-100"
    >
      <Container fluid className="it-header-slim-wrapper-content">
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <a href="https://www.agid.gov.it/it/piattaforme/pagopa">
              PagoPa SPA
            </a>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="px-3">
            <a href="https://io.italia.it/">io.italia.it</a>
          </NavItem>
        </Nav>
      </Container>
    </AppHeader>
  );
};
