import React from "react";
import { withRouter } from "react-router";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media
} from "reactstrap";

import spidLogo from "../../../assets/img/spid-ico-circle-bb.svg";
import images from "../../../assets/img/spid/*.svg";

import { ICustomWindow } from "../../../customTypes/CustomWindow";

import "./SpidLoginButton.css";

/**
 * Component for spid login button with dropdown
 */
export const SpidLoginButton = withRouter(() => {
  /**
   * Create window with custom element _env_ for environment variables
   */
  const customWindow = window as ICustomWindow;

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
    ...(customWindow._env_.IO_ONBOARDING_PA_SHOW_FAKE_IDP === "0"
      ? []
      : [{ name: "Fake IDP", idp: "xx_testenv2" }])
  ];

  /**
   * Function to open/close spid dropdown
   */
  const toggleSpidDropdown = () =>
    setIsSpidDropdownOpen((prevState: boolean) => !prevState);

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
     * Get all spid idps images
     */
    const imageString = `spid-idp-${spidButton.idp}`;

    return (
      <DropdownItem key={spidButton.name} className="p-0">
        <a
          className="w-100 d-block p-3"
          href={
            customWindow._env_.IO_ONBOARDING_PA_IS_MOCK_ENV === "1"
              ? "/dashboard"
              : `${customWindow._env_.IO_ONBOARDING_PA_API_HOST}:${customWindow._env_.IO_ONBOARDING_PA_API_PORT}/login?entityID=${spidButton.idp}&authLevel=SpidL2`
          }
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
        toggle={toggleSpidDropdown}
        className="w-100"
      >
        <DropdownToggle
          caret={true}
          tag="button"
          className="btn btn-primary btn-icon toggle-spid"
        >
          <Media object={true} src={spidLogo} alt="Spid Logo" width={29} />
          <span>Log in con SPID</span>
        </DropdownToggle>
        <DropdownMenu>{spidDropDownItems}</DropdownMenu>
      </ButtonDropdown>
    </div>
  );
});
