import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import { useTranslation } from "react-i18next";
import { Button, Col, InputGroup, InputGroupAddon, Row } from "reactstrap";

import { FoundAdministration } from "../../../../generated/definitions/api/FoundAdministration";

import "./SearchInstitutions.css";

import bootstrapItaliaImages from "../../../assets/img/bootstrap-italia/sprite.svg";

interface ISearchInstitutionProps {
  institutions: ReadonlyArray<FoundAdministration>;
  onInstitutionSearch: (event: string) => void;
  onInstitutionSelected: (event: ReadonlyArray<FoundAdministration>) => void;
  selectedInstitution: FoundAdministration;
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

  const handleChange = (selected: ReadonlyArray<FoundAdministration>) => {
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
