import * as React from "react";

import ioLogoWhite from "../../assets/img/io-logo-white.svg";
import mockImage from "../../assets/img/mock-img-white.png";
import "./Home.css";

export const Home: React.FC = () => {
  return (
    <div className="Home h-100">
      <div className="container-fluid d-flex h-100 flex-column custom-background-container overflow-auto">
        <div className="row justify-content-start">
          <div className="col">
            <img
              src={ioLogoWhite}
              className="io-icon-home"
              width="109"
              height="88"
            />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col">
            <h2 className="text-white home-title home-title-mt mb-0">
              Portale di backoffice IO
            </h2>
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col">
            <p className="text-white home-text home-text-mt mb-0">
              Seleziona il profilo con cui accedere al portale di backoffice.
            </p>
          </div>
        </div>
        <div className="row justify-content-start bg-dark bg-transparent">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary home-btn home-btn-first-mt"
            >
              Sviluppatore
            </button>
          </div>
        </div>
        <div className="row justify-content-start bg-dark bg-transparent">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary home-btn home-btn-mt"
            >
              Delegato ente
            </button>
          </div>
        </div>
        <div className="row justify-content-start bg-dark bg-transparent">
          <div className="col">
            <button
              type="button"
              className="btn btn-primary home-btn home-btn-mt"
            >
              Responsabile legale ente
            </button>
          </div>
        </div>
        <div className="row justify-content-start home-row-logos">
          <div className="col-6 text-right">
            {/*TODO: fix with right images when available - keep track with story 167623550*/}
            <img src={mockImage} width={220} />
          </div>
          <div className="col-6 text-left">
            {/* TODO: fix with right images when available - keep track with story 167623550*/}
            <img src={mockImage} width={220} />
          </div>
        </div>
      </div>
    </div>
  );
};
