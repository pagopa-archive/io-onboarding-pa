import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

interface ILegalRepresentative {
  familyName: string;
  firstName: string;
  fiscalCode: string | null;
  phoneNumber: string | null;
}

interface IInstitution {
  fiscalCode: string;
  ipaCode: string;
  name: string;
  legalRepresentative: ILegalRepresentative;
  pecs: ReadonlyArray<string>;
  selectedPecIndex: number | null;
  scope: string | null;
}

interface ISearchInstitutionProps {
  onInstitutionSelected: (event: ReadonlyArray<IInstitution>) => void;
  selectedInstitution: IInstitution;
}

/**
 * Component for institution search with autocomplete
 */
export const SearchInstitutions = (props: ISearchInstitutionProps) => {
  const options: ReadonlyArray<IInstitution> = [
    {
      fiscalCode: "CMNRPL44F22L000I",
      ipaCode: "ajhajhajajjajajaj",
      legalRepresentative: {
        familyName: "Aliti",
        firstName: "Davide",
        fiscalCode: "LTADVD88T22F205H",
        phoneNumber: "123456789"
      },
      name: "Comune di Ripalta Cremasca",
      pecs: ["a@a.it", "b@b.it"],
      scope: null,
      selectedPecIndex: null
    }
  ];

  const handleSearch = (query: string) => {
    console.log(query);
  };

  const handleChange = (selected: ReadonlyArray<IInstitution>) => {
    console.log(selected);
    props.onInstitutionSelected(selected);
  };

  return (
    <div className="SearchInstitutions">
      <AsyncTypeahead
        allowNew={false}
        delay={400}
        isLoading={false}
        multiple={false}
        options={options}
        labelKey="name"
        minLength={3}
        onSearch={handleSearch}
        onChange={handleChange}
        placeholder="Ricerca qui il tuo ente"
        selected={
          props.selectedInstitution.name ? [props.selectedInstitution] : []
        }
      />
    </div>
  );
};
