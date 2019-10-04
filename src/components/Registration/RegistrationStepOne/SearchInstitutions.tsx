import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import { useTranslation } from "react-i18next";
import "./SearchInstitutions.css";

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
  institutions: ReadonlyArray<IInstitution>;
  onInstitutionSearch: (event: string) => void;
  onInstitutionSelected: (event: ReadonlyArray<IInstitution>) => void;
  selectedInstitution: IInstitution;
}

/**
 * Component for institution search with autocomplete
 */
export const SearchInstitutions = (props: ISearchInstitutionProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const handleSearch = (query: string) => {
    props.onInstitutionSearch(query);
  };

  const handleChange = (selected: ReadonlyArray<IInstitution>) => {
    props.onInstitutionSelected(selected);
  };

  return (
    <div className="SearchInstitutions">
      <AsyncTypeahead
        allowNew={false}
        delay={600}
        isLoading={false}
        multiple={false}
        options={props.institutions}
        labelKey="name"
        minLength={5}
        onSearch={handleSearch}
        onChange={handleChange}
        placeholder={t("signUp.searchInstitutions.placeholder")}
        promptText={t("signUp.searchInstitutions.searching")}
        searchText={t("signUp.searchInstitutions.searching")}
        emptyLabel={t("signUp.searchInstitutions.emptyLabel")}
        selected={
          props.selectedInstitution.name ? [props.selectedInstitution] : []
        }
      />
    </div>
  );
};
