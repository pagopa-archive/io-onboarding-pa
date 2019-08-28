import * as React from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";

export const SearchInstitutions: React.FC = () => {
  const options: ReadonlyArray<{ login: string }> = [
    { login: "Comune di Ripalta Cremasca" },
    { login: "Comune di Segrate" },
    { login: "Scuola Media A. Sabin" }
  ];

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <div className="SearchInstitutions">
      <AsyncTypeahead
        allowNew={false}
        isLoading={false}
        multiple={false}
        options={options}
        labelKey="login"
        minLength={3}
        onSearch={handleSearch}
        placeholder="Ricerca qui il tuo ente"
      />
    </div>
  );
};
