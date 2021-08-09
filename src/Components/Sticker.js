import React from "react";

export default function Sticker(props) {
  let { id, heading, content } = props.stickerData;
  return (
    <div
      className="sticker"
      id={id}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("id", id);
      }}
    >
      <div>
        <h3>{heading}</h3>
        <p>{content.length > 0 ? content : "No additional content"}</p>
      </div>
    </div>
  );
}
