import { AppHeader } from "@coreui/react";
import React from "react";
import { Container, Nav, NavItem } from "reactstrap";

import { useTranslation } from "react-i18next";
import "./SlimHeader.css";

/**
 * Slim header at top of the app
 */
export const SlimHeader = () => {
  const { t } = useTranslation();

  return (
    <AppHeader
      fixed={true}
      className="SlimHeader it-header-slim-wrapper border-bottom-0 w-100"
    >
      <Container fluid={true} className="it-header-slim-wrapper-content">
        <Nav className="d-md-down-none" navbar={true}>
          <NavItem className="px-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={t("common.links.pagopa.link")}
            >
              {t("common.links.pagopa.text")}
            </a>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar={true}>
          <NavItem className="px-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={t("common.links.io.link")}
            >
              {t("common.links.io.text")}
            </a>
          </NavItem>
        </Nav>
      </Container>
    </AppHeader>
  );
};
