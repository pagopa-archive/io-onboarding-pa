import React from "react";
import { withRouter } from "react-router";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

import images from "../../../assets/img/spid/*.svg";

import "./SpidLoginButton.css";

/**
 * Component for spid login button with dropdown
 */
export const SpidLoginButton = withRouter(props => {
  /**
   * Initial state for spidButton (dropdown closed)
   */
  const [isSpidDropdownOpen, setIsSpidDropdownOpen] = React.useState(false);

  /**
   * Spid idps with test idp if node is not set to production
   */
  const spidProvidersInfo: ReadonlyArray<{
    idp: string;
    name: string;
  }> = [
    { name: "Aruba ID", idp: "arubaid" },
    { name: "Infocert ID", idp: "infocertid" },
    { name: "Intesa ID", idp: "intesaid" },
    { name: "Lepida ID", idp: "lepidaid" },
    { name: "Namirial ID", idp: "namirialid" },
    { name: "Poste ID", idp: "posteid" },
    { name: "Sielte ID", idp: "sielteid" },
    { name: "SPIDItalia Register.it", idp: "spiditalia" },
    { name: "Tim ID", idp: "timid" },
    ...(process.env.NODE_ENV === "production"
      ? []
      : [{ name: "Fake IDP", idp: "xx_testenv2" }])
  ];

  /**
   * Function to shuffle idp order at each render
   */
  const sliceIndex = Math.floor(Math.random() * spidProvidersInfo.length);
  const shuffledSpidProvidersInfo = spidProvidersInfo
    .slice(sliceIndex, spidProvidersInfo.length)
    .concat(spidProvidersInfo.slice(0, sliceIndex));

  /**
   * Create dropdown elements
   */
  const spidDropDownItems = shuffledSpidProvidersInfo.map(spidButton => {
    /**
     * Create window with custom element _env_ for environment variables
     */
    const customWindow = window as Window & {
      _env_: {
        IO_ONBOARDING_PA_API_HOST: string;
        IO_ONBOARDING_PA_API_PORT: string;
      };
    };

    /**
     * Get all spid idps images
     */
    const imageString = `spid-idp-${spidButton.idp}`;

    return (
      <DropdownItem key={spidButton.name}>
        <a
          href={`${customWindow._env_.IO_ONBOARDING_PA_API_HOST}:${customWindow._env_.IO_ONBOARDING_PA_API_PORT}/login?entityID=${spidButton.idp}&authLevel=SpidL2`}
        >
          <span className="spid-sr-only">{spidButton.name}</span>
          <img
            src={`${images[imageString]}`}
            alt={spidButton.name}
            height="20"
          />
        </a>
      </DropdownItem>
    );
  });

  return (
    <div className="SpidButton">
      <ButtonDropdown
        isOpen={isSpidDropdownOpen}
        toggle={() => {
          setIsSpidDropdownOpen((prevState: boolean) => !prevState);
        }}
      >
        <DropdownToggle
          caret
          tag="button"
          className="btn btn-primary toggle-spid"
        >
          Log in con SPID
        </DropdownToggle>
        <DropdownMenu>{spidDropDownItems}</DropdownMenu>
      </ButtonDropdown>
    </div>
  );
});
