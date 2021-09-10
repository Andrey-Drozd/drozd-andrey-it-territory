import React, { useState } from "react";
import { ItemStatusFilter } from "../item-status-filter";
import "./search-panel.css";

function SearchPanel(props) {
  const [state, setState] = useState({ inputValue: "" });

  const searchOnChange = (e) => {
    setState((state) => {
      return {
        ...state,
        inputValue: e.target.value,
      };
    });

    props.searchOnChange(e.target.value);
  };

  const searchText = "Поиск по списку";

  return (
    <div className="top-panel d-flex">
      <input
        type="text"
        placeholder={searchText}
        className="form-control search-input"
        onChange={searchOnChange}
        value={state.inputValue}
      />

      <ItemStatusFilter filter={props.filter} stateStatus={props.stateStatus} />
    </div>
  );
}

export { SearchPanel };
