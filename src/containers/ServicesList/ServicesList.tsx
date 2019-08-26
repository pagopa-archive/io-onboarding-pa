import React, { FC, Fragment } from "react";
import { NoServicesCard } from "../../components/NoServicesCard/NoServicesCard";
import { ServicesCard } from "../../components/ServiceCard/ServiceCard";

interface IServicesListProps {
  services: ReadonlyArray<{
    serviceName: string;
    serviceState: string;
    activationDate: string;
    lastMessage: string;
    sentMessages: number;
    owner: string;
  }>;
}

export const ServicesList: FC<IServicesListProps> = props => {
  return (
    <div className="ServicesList h-100">
      <div className="row h-100">
        {props.services.length === 0 ? (
          <div className="col-4">
            <NoServicesCard />
          </div>
        ) : (
          <Fragment>
            {props.services.map(service => {
              return (
                <div className="col-4">
                  <ServicesCard
                    serviceName={service.serviceName}
                    serviceState={service.serviceState}
                    activationDate={service.activationDate}
                    lastMessage={service.lastMessage}
                    owner={service.owner}
                    sentMessages={service.sentMessages}
                  />
                </div>
              );
            })}
          </Fragment>
        )}
      </div>
    </div>
  );
};
