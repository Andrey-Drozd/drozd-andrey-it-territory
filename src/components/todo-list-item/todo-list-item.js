import React, { useState } from "react";
import "./todo-list-item.css";

function TodoListItem(props) {
  const [name, setName] = useState("");

  let classNames = "todo-list-item";

  if (props.done) {
    classNames = classNames + " done";
  }

  const saveTitle = () => {
    props.onSave(name.length > 0 ? name : props.label);
    setName("");
  };

  const shortenedName = (name) => {
    if (name.length > 30) {
      return name.substring(0, 30) + "...";
    }

    return name;
  };

  return (
    <div>
      {props.display ? (
        <div className="button-save">
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={saveTitle}
          >
            <i className="fa fa-floppy-o" />
          </button>
        </div>
      ) : null}

      {!props.display ? (
        <div className="button-on-toggle-done">
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={props.onToggleDone}
          >
            <i className="fa fa-check" />
          </button>
        </div>
      ) : null}

      {!props.display ? (
        <div className="button-edit">
          <button
            type="button"
            className="btn btn-outline-info btn-sm"
            onClick={props.onEdit}
          >
            <i className="fa fa-pencil" />
          </button>
        </div>
      ) : null}

      {!props.display ? (
        <div className="button-trash">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={props.onDeleted}
          >
            <i className="fa fa-trash-o" />
          </button>
        </div>
      ) : null}

      {!props.display ? (
        <div className={"row-item-name"}>
          <span className={classNames}>
            <span className="todo-list-item-label">
              {shortenedName(props.label)}
            </span>
          </span>
        </div>
      ) : null}

      {props.display ? (
        <div className={"row-item-name"}>
          <span className={classNames}>
            <span className="todo-list-item-label">
              <label className="searchInputRegion">
                <input
                  value={name.length > 0 ? name : props.label}
                  className="searchInputRegion"
                  type="text"
                  onChange={(e) => {
                    setName(e?.target?.value);
                  }}
                />
              </label>
            </span>
          </span>
        </div>
      ) : null}
    </div>
  );
}

export { TodoListItem };
