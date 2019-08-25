import * as React from "react";
import { withRouter } from "react-router";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

import "./SpidButton.css";

import images from "../../assets/img/spid/*.svg";

export const Spidbutton = withRouter(props => {
  const [isSpidDropdownOpen, setIsSpidDropdownOpen] = React.useState(false);

  const spidProvidersInfo: ReadonlyArray<{
    href: string;
    img: string;
    name: string;
  }> = [
    { href: "#", name: "Aruba ID", img: "spid-idp-arubaid" },
    { href: "#", name: "Infocert ID", img: "spid-idp-infocertid" },
    { href: "#", name: "Intesa ID", img: "spid-idp-intesaid" },
    { href: "#", name: "Lepida ID", img: "spid-idp-lepidaid" },
    { href: "#", name: "Namirial ID", img: "spid-idp-namirialid" },
    { href: "#", name: "Poste ID", img: "spid-idp-posteid" },
    { href: "#", name: "Sielte ID", img: "spid-idp-sielteid" },
    {
      href: "#",
      img: "spid-idp-spiditalia",
      name: "SPIDItalia Register.it"
    },
    { href: "#", name: "Tim ID", img: "spid-idp-timid" }
  ];

  const sliceIndex = Math.floor(Math.random() * spidProvidersInfo.length);

  const shuffledSpidProvidersInfo = spidProvidersInfo
    .slice(sliceIndex, spidProvidersInfo.length)
    .concat(spidProvidersInfo.slice(0, sliceIndex));

  const spidDropDownItems = shuffledSpidProvidersInfo.map(spidButton => {
    return (
      <DropdownItem
        key={spidButton.name}
        onClick={() => {
          return props.history.push("/dashboard");
        }}
      >
        <a href={spidButton.href}>
          <span className="spid-sr-only">{spidButton.name}</span>
          <img
            src={`${images[spidButton.img]}`}
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
