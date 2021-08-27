import React, { useCallback } from "react";
import Card from "./Card";
import { UPDATE_ALL } from "../Utils/constants";
import { getBorderClass } from "../Utils/functions";
import { setDataToStorage } from "../Utils/service";
import { localStorageKey } from "../Utils/constants";

export default function Panel(props) {
  const { state, dispatch, type } = props;

  const handleDragOver = useCallback((event) => event.preventDefault(), []);

  const handleDragStart = useCallback(
    (event, id) => {
      event.dataTransfer.setData("dragged", JSON.stringify({ id, type }));
    },
    [type]
  );

  const handleDrop = useCallback(
    (event) => {
      let id, dragType, newData;
      try {
        const tempData = JSON.parse(event.dataTransfer.getData("dragged"));
        dragType = tempData.type;
        id = tempData.id;
        newData = JSON.parse(JSON.stringify(state));
      } catch (error) {
        console.log(error);
        return;
      }
      if (type === dragType) {
        return;
      }
      const updatedData = newData[dragType].find(
        (element) => String(element.id) === String(id)
      );
      newData[dragType] = newData[dragType].filter(
        (data) => String(data.id) !== String(id)
      );
      if (updatedData === undefined) {
        return;
      }
      newData[type].push(updatedData);
      setDataToStorage(localStorageKey, JSON.stringify(newData));
      dispatch({
        type: UPDATE_ALL,
        payload: newData,
      });
    },
    [dispatch, state, type]
  );

  return (
    <li
      className={`panel border-top-${getBorderClass(type)}`}
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
            <li
              className="card"
              key={cardData.id}
              id={cardData.id}
              draggable
              onDragStart={(event) => handleDragStart(event, cardData.id)}
            >
              <Card
                cardData={cardData}
                type={type}
                dispatch={dispatch}
                state={state}
              />
            </li>
          );
        })}
      </ul>
    </li>
  );
}
