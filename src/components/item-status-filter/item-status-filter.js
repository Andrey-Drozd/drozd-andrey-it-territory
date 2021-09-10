import React from "react";
import "./item-status-filter.css";

const ItemStatusFilter = (props) => {
  const buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" },
  ];

  const btnStatus = props.stateStatus;
  const btnCssMain = "btn btn-info";
  const btnCssSecond = "btn btn-outline-secondary";

  const btn = buttons.map((el) => {
    return (
      <button
        type="button"
        className={el.label === btnStatus ? btnCssMain : btnCssSecond}
        onClick={() => props.filter(el.label)}
        key={el.name}
      >
        {el.label}
      </button>
    );
  });

  return <div className="btn-group">{btn}</div>;
};

export { ItemStatusFilter };
