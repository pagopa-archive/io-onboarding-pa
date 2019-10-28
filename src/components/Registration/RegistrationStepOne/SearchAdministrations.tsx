import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import { useTranslation } from "react-i18next";
import { Button, Col, InputGroup, InputGroupAddon, Row } from "reactstrap";

import { FoundAdministration } from "../../../../generated/definitions/api/FoundAdministration";
import {
  FoundNotRegisteredAdministration,
  FoundNotRegisteredAdministrationLegal_representative
} from "../../../../generated/definitions/api/FoundNotRegisteredAdministration";
import {
  FoundRegisteredAdministration,
  FoundRegisteredAdministrationLegal_representative
} from "../../../../generated/definitions/api/FoundRegisteredAdministration";

import "./SearchAdministrations.css";

import bootstrapItaliaImages from "../../../assets/img/bootstrap-italia/sprite.svg";

/*
 * Defined a type for selected administration that will be filled with the form
 * it holds every property of FoundNotRegisteredAdministration and all the properties of
 * FoundRegisteredAdministration not shared with FoundNotRegisteredAdministration, as optionals
 */
type CustomAdministration = FoundNotRegisteredAdministration &
  Partial<
    Omit<FoundRegisteredAdministration, keyof FoundNotRegisteredAdministration>
  > & {
    legal_representative: Partial<
      Omit<
        FoundRegisteredAdministrationLegal_representative,
        keyof FoundNotRegisteredAdministrationLegal_representative
      >
    >;
  };

interface ISearchAdministrationProps {
  administrations: ReadonlyArray<FoundAdministration>;
  onAdministrationSearch: (event: string) => void;
  onAdministrationSelected: (
    event: ReadonlyArray<CustomAdministration>
  ) => void;
  selectedAdministration: CustomAdministration;
}

/**
 * Component for administration search with autocomplete
 */
export const SearchAdministrations = (props: ISearchAdministrationProps) => {
  /**
   * react-i18next translation hook
   */
  const { t } = useTranslation();

  const handleSearch = (query: string) => {
    props.onAdministrationSearch(query);
  };

  const handleChange = (selected: ReadonlyArray<CustomAdministration>) => {
    props.onAdministrationSelected(selected);
  };

  const selectedAdministration = props.selectedAdministration.name
    ? [props.selectedAdministration]
    : [];

  return (
    <div className="SearchAdministrations pt-2 pb-4">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button color="primary" className="py-0 px-2">
            <Row>
              <Col sm="4">
                <svg className="icon icon-sm icon-white">
                  <use xlinkHref={`${bootstrapItaliaImages}#it-search`} />
                </svg>
              </Col>
              <Col sm="8">{t("common.buttons.search")}</Col>
            </Row>
          </Button>
        </InputGroupAddon>
        <AsyncTypeahead
          className="flex-grow-1"
          allowNew={false}
          delay={600}
          isLoading={false}
          multiple={false}
          options={props.administrations}
          labelKey="name"
          minLength={5}
          onSearch={handleSearch}
          onChange={handleChange}
          placeholder={t("signUp.searchAdministrations.placeholder")}
          promptText={t("signUp.searchAdministrations.searching")}
          searchText={t("signUp.searchAdministrations.searching")}
          emptyLabel={t("signUp.searchAdministrations.emptyLabel")}
          selected={selectedAdministration}
        />
      </InputGroup>
    </div>
  );
};
