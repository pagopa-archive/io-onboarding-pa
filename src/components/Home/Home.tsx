import React, { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Col, Media, Row } from "reactstrap";
import { HomeLoginButton } from "./HomeLoginButton/HomeLoginButton";

import ioLogoWhite from "../../assets/img/io-logo-white.svg";

import logoTD from "../../assets/img/logo_td.png";

import logoHomeDel from "../../assets/img/logo_home_del.svg";
import logoHomeDev from "../../assets/img/logo_home_dev.svg";
import logoHomeRep from "../../assets/img/logo_home_legal_rep.svg";

import "./Home.css";
/**
 * Landing page with three different login for developers, institution delegate and institution legal ref
 */
export const Home = () => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  /**
   * array containing three login elements props
   */
  const homeLoginButtonsArray: ReadonlyArray<
    ComponentProps<typeof HomeLoginButton>
  > = [
    {
      buttonText: "Sviluppatore",
      img: logoHomeDev,
      imgHeight: 100,
      link: "developer-login",
      offset: "home",
      text:
        "Entra qui se ti occupi di sviluppo di servizi digitali per gli enti e le amministrazioni italiane"
    },
    {
      buttonText: "Delegato Ente",
      img: logoHomeDel,
      imgHeight: 100,
      link: "spid-login",
      offset: undefined,
      text:
        "Entra qui se lavori in una pubblica amministrazione e sei delegato alla gestione dei servizi digitali"
    },
    {
      buttonText: "Legale Rappresentante Ente",
      img: logoHomeRep,
      imgHeight: 100,
      link: "legal-rep-login",
      offset: undefined,
      text:
        "Entra qui se rappresenti legalmente un’ente, per supervisionare l’integrazione dei servizi su IO"
    }
  ];

  return (
    <div className="Home h-100">
      <div className="container-fluid d-flex h-100 flex-column custom-background-container overflow-auto">
        <Row className="pt-4 pl-4">
          <Col sm="auto">
            <Media object src={logoTD} alt="Team Digitale Logo" height="40" />
          </Col>
          <Col sm="auto" className="pl-5">
            <Media
              object
              src="https://via.placeholder.com/189x40.png?text=NewCo_Logo"
              alt="NewCo Logo"
            />
          </Col>
        </Row>
        <Row className="pt-3 mt-4">
          <Col>
            <Media object src={ioLogoWhite} alt="NewCo Logo" height="60" />
          </Col>
        </Row>
        <Row className="pt-4 mt-4">
          <Col>
            <h2 className="text-white mb-4 mt-3">IO Back-office</h2>
          </Col>
        </Row>
        <Row className="pt-2 pb-5">
          <Col>
            <p className="text-white">{t("home.profileSelect")}</p>
          </Col>
        </Row>
        <Row className="pt-2 mt-2 text-center">
          {homeLoginButtonsArray.map(homeLoginButton => (
            <HomeLoginButton
              key={homeLoginButton.link}
              buttonText={homeLoginButton.buttonText}
              img={homeLoginButton.img}
              imgHeight={homeLoginButton.imgHeight}
              text={homeLoginButton.text}
              link={homeLoginButton.link}
              offset={homeLoginButton.offset}
            />
          ))}
        </Row>
      </div>
    </div>
  );
};
