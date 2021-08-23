import React, { useCallback } from "react";
import Card from "./Card";
import { types } from "../Utils/constants";

export default function Panel(props) {
  const { state, dispatch, type } = props;

  const handleDrop = (event) => {
    let updatedData = null;
    const id = event.dataTransfer.getData("id");
    const checkAvailable = (data) => {
      if (String(data.id) === String(id)) {
        updatedData = data;
      }
      return String(data.id) !== String(id);
    };

    Object.keys(types).forEach((element) => {
      types[element] !== type &&
        dispatch({
          type: `UPDATE_${types[element]}`,
          payload: state[types[element]].filter(checkAvailable),
        });
    });

    Object.keys(types).forEach((element) => {
      if (types[element] === type && updatedData !== null) {
        dispatch({
          type: `UPDATE_${types[element]}`,
          payload: [...state[types[element]], updatedData],
        });
      }
    });
  };

  const handleDragOver = useCallback((event) => event.preventDefault(), []);

  const getBorderClass = () => {
    const color =
      type === types.TODO ? "red" : type === types.DONE ? "green" : "blue";
    return color;
  };

  return (
    <li
      className={`panel border-top-${getBorderClass()}`}
      id={type}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="panel-heading">
        <p className="display-inline">{type}</p>
        <button className="add-card" onClick={props.openModal}>
          +
        </button>
      </div>
      <ul className="list">
        {state[type].map((cardData) => {
          return (
            <Card key={cardData.id} cardData={cardData} dispatch={dispatch} />
          );
        })}
      </ul>
    </li>
  );
}
