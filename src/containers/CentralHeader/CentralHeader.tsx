import * as React from "react";
import { AppHeader } from "@coreui/react";
import { RouteComponentProps, withRouter } from "react-router";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown
} from "reactstrap";
import ioLogoWhite from "../../assets/img/io-logo-white.svg";

import bootstrapItaliaImages from "../../assets/img/bootstrap-italia/sprite.svg";

import "./CentralHeader.css";

interface ICentralHeaderCustomProps {
  userName?: string;
}

interface ICentralHeaderProps
  extends ICentralHeaderCustomProps,
    RouteComponentProps {}

export const CentralHeader = withRouter<
  ICentralHeaderProps,
  React.FC<ICentralHeaderProps>
>((props: ICentralHeaderProps) => {
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
                      <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav direction="down">
                          <DropdownToggle nav className="text-white pb-0">
                            <p className="username-text mb-0">
                              {props.userName}
                            </p>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              onClick={() => props.history.push("/profile")}
                            >
                              Profilo
                            </DropdownItem>
                            {/*<DropdownItem onClick={e => this.props.onLogout(e)}>Logout</DropdownItem>*/}
                            <DropdownItem>Logout</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
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
});
