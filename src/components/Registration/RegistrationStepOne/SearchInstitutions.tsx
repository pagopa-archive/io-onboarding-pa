import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import { useTranslation } from "react-i18next";
import { Button, Col, InputGroup, InputGroupAddon, Row } from "reactstrap";

import { FoundAdministration } from "../../../../generated/definitions/api/FoundAdministration";
import {
  FoundNotRegisteredAdministration,
  FoundNotRegisteredAdministrationLegalRepresentative
} from "../../../../generated/definitions/api/FoundNotRegisteredAdministration";
import {
  FoundRegisteredAdministration,
  FoundRegisteredAdministrationLegalRepresentative
} from "../../../../generated/definitions/api/FoundRegisteredAdministration";

import "./SearchInstitutions.css";

import bootstrapItaliaImages from "../../../assets/img/bootstrap-italia/sprite.svg";

/*
 * Defined a type for selected institution that will be filled with the form
 * it holds every property of FoundNotRegisteredAdministration and all the properties of
 * FoundRegisteredAdministration not shared with FoundNotRegisteredAdministration, as optionals
 */
type CustomInstitution = FoundNotRegisteredAdministration &
  Partial<
    Omit<FoundRegisteredAdministration, keyof FoundNotRegisteredAdministration>
  > & {
    legalRepresentative: Partial<
      Omit<
        FoundRegisteredAdministrationLegalRepresentative,
        keyof FoundNotRegisteredAdministrationLegalRepresentative
      >
    >;
  };

interface ISearchInstitutionProps {
  institutions: ReadonlyArray<FoundAdministration>;
  onInstitutionSearch: (event: string) => void;
  onInstitutionSelected: (event: ReadonlyArray<CustomInstitution>) => void;
  selectedInstitution: CustomInstitution;
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

  const handleChange = (selected: ReadonlyArray<CustomInstitution>) => {
    props.onInstitutionSelected(selected);
  };

  return (
    <div className="SearchInstitutions pt-2 pb-4">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button color="primary" className="py-0 px-2">
            <Row>
              <Col sm="4">
                <svg className="icon icon-sm icon-white">
                  <use xlinkHref={`${bootstrapItaliaImages}#it-search`} />
                </svg>
              </Col>
              <Col sm="8">{t("signUp.searchInstitutions.buttonText")}</Col>
            </Row>
          </Button>
        </InputGroupAddon>
        <AsyncTypeahead
          className="flex-grow-1"
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
      </InputGroup>
    </div>
  );
};
