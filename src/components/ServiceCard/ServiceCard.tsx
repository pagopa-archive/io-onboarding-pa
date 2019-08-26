import React, {FC} from "react";
import {Badge, Card, CardBody, CardHeader} from "reactstrap";

interface IServiceCardProps {
  serviceName: string;
  serviceState: string;
  activationDate: string;
  lastMessage: string;
  sentMessages: number;
  owner: string;
}

export const ServicesCard: FC<IServiceCardProps> = props => {
  return (
    <div>
      <Card className="card-bg pr-1">
        <CardHeader>
          {props.serviceName}
          <div className="card-header-actions">
            <Badge color="success" className="float-right">
              {props.serviceState}
            </Badge>
          </div>
        </CardHeader>
        <CardBody>
          <div className="row">
            <div className="col">
              <p>Data Creazione:</p>
              <p>{props.activationDate}</p>
            </div>
            <div className="col">
              <p>Ultimo messaggio:</p>
              <p>{props.lastMessage}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Messaggi inviati:</p>
              <p>{props.sentMessages}</p>
            </div>
            <div className="col">
              <p>Autore:</p>
              <p>{props.owner}</p>
            </div>
          </div>
        </CardBody>
        <a className="read-more row w-100" href="#">
          <span className="col text-center">Vai al dettaglio</span>
        </a>
      </Card>
    </div>
  );
};
