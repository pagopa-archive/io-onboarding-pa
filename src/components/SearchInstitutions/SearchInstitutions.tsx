import { Dispatch, SetStateAction } from "react";
import * as React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

interface ISearchInstitutions {
  onInstitutionSelected: (
    event: ReadonlyArray<{
      institutionName: string;
      institutionFiscalCode: string;
      institutionAdminName: string;
      institutionPecs: ReadonlyArray<string>;
      institutionLegalRepName: string;
      institutionLegalRepSurname: string;
      institutionLegalRepCf: string;
    }>
  ) => void;
}
export const SearchInstitutions: React.FC<ISearchInstitutions> = props => {
  const options: ReadonlyArray<{
    institutionName: string;
    institutionFiscalCode: string;
    institutionAdminName: string;
    institutionPecs: ReadonlyArray<string>;
    institutionLegalRepName: string;
    institutionLegalRepSurname: string;
    institutionLegalRepCf: string;
  }> = [
    {
      institutionAdminName: "Luca Prete",
      institutionFiscalCode: "CMNRPL44F22L000I",
      institutionLegalRepCf: "LTADVD88T22F205H",
      institutionLegalRepName: "Davide",
      institutionLegalRepSurname: "Aliti",
      institutionName: "Comune di Ripalta Cremasca",
      institutionPecs: ["a@a.it", "b@b.it"]
    }
  ];

  const handleSearch = (query: string) => {
    console.log(query);
  };

  const handleChange = (selected: {
    institutionName: string;
    institutionFiscalCode: string;
    institutionAdminName: string;
    institutionPecs: ReadonlyArray<string>;
    institutionLegalRepName: string;
    institutionLegalRepSurname: string;
    institutionLegalRepCf: string;
  }) => {
    console.log(selected);
    props.onInstitutionSelected(selected);
  };

  return (
    <div className="SearchInstitutions">
      <AsyncTypeahead
        allowNew={false}
        isLoading={false}
        multiple={false}
        options={options}
        labelKey="institutionName"
        minLength={3}
        onSearch={handleSearch}
        onChange={handleChange}
        placeholder="Ricerca qui il tuo ente"
      />
    </div>
  );
};
