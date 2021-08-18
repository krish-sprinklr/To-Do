import React from "react";

export default React.memo(function Card(props) {
  const { id, heading, content } = props.cardData;
  const handleDragStart = React.useCallback(
    (event) => {
      event.dataTransfer.setData("id", id);
    },
    [id]
  );
  return (
    <div className="card" id={id} draggable onDragStart={handleDragStart}>
      <div>
        <h3>{heading}</h3>
        <p>{content.length > 0 ? content : "No additional content"}</p>
      </div>
    </div>
  );
});
