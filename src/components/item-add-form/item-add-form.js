import React, { useState } from "react";
import "./item-add.form.css";

function ItemAddForm(props) {
  const [state, setState] = useState({ inputValue: "" });

  const onChangeInput = (e) => {
    setState((state) => {
      return {
        ...state,
        inputValue: e.target.value,
      };
    });
  };

  const onSumbitInput = (e) => {
    e.preventDefault();

    if (state.inputValue.length === 0) {
      return;
    }

    props.addItem(state.inputValue);

    setState((state) => {
      return {
        ...state,
        inputValue: "",
      };
    });
  };

  return (
    <div className="add-form-panel">
      <form className="item-add-form d-flex">
        <input
          className="form-control"
          type="text"
          value={state.inputValue}
          onChange={onChangeInput}
          onSubmit={onSumbitInput}
          placeholder="Название новой строки"
        />
        <button className="btn btn-info" onClick={onSumbitInput}>
          Add
        </button>
      </form>
    </div>
  );
}

export { ItemAddForm };
