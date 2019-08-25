import * as React from "react";
import { AppHeader } from "@coreui/react";
import ioLogoWhite from "../../assets/img/io-logo-white.svg";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

import "./CentralHeader.css";

interface ICentralHeaderProps {
  userName?: string;
}

export const CentralHeader: React.FC<ICentralHeaderProps> = props => {
  return (
    <AppHeader
      fixed
      className="CentralHeader it-header-center-wrapper border-bottom-0 position-fixed w-100"
    >
      <div className="w-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 text-right">
              <img
                src={ioLogoWhite}
                className="io-icon-home"
                width="64"
                height="52"
              />
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col-auto ml-2">
                  <span className="row text-white text-title">
                    Portale Enti
                  </span>
                  <span className="row text-white text-par">
                    Gestisci il profilo digitale del tuo ente
                  </span>
                </div>
              </div>
            </div>
            <div className="col-2 text-white">
              <div className="row h-100 align-items-end">
                {props.userName !== "" ? (
                  <React.Fragment>
                    <div className="col-2">
                      <svg className="icon icon-white">
                        <use xlinkHref={`${bootstrapItaliaImages}#it-user`} />
                      </svg>
                    </div>
                    <div className="col-10">
                      <p className="username-text mb-0">{props.userName}</p>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppHeader>
  );
};
