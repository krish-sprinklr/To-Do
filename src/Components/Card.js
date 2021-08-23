import React from "react";
import { DELETE_CARD } from "../Utils/constants";

export default React.memo(function Card(props) {
  const { id, heading, content } = props.cardData;
  const { dispatch } = props;
  const handleDragStart = React.useCallback(
    (event) => {
      event.dataTransfer.setData("id", id);
    },
    [id]
  );

  const handleDelete = () => {
    dispatch({ type: DELETE_CARD, payload: id });
  };

  return (
    <li className="card" id={id} draggable onDragStart={handleDragStart}>
      <h3 className="display-inline">{heading}</h3>
      <button className="float-right delete-card" onClick={handleDelete}>
        <strong>x</strong>
      </button>
      <p>{content.length > 0 ? content : "No additional content"}</p>
    </li>
  );
});
