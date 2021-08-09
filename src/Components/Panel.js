import React from "react";
import Sticker from "./Sticker";

export default function Panel(props) {
  const { type } = props;
  const { toDo, ongoing, done, updateDone, updateOngoing, updateTodo } =
    props.state;
  const dataList =
    type === "To-Do" ? toDo : type === "On-Going" ? ongoing : done;

  const handleDrop = (event) => {
    let updatedData = null;
    const id = event.dataTransfer.getData("id");
    const checkAvailable = (data) => {
      if (String(data.id) === String(id)) {
        updatedData = data;
      }
      return String(data.id) !== String(id);
    };
    type !== "To-Do" && updateTodo(toDo.filter(checkAvailable));
    type !== "On-Going" && updateOngoing(ongoing.filter(checkAvailable));
    type !== "Done" && updateDone(done.filter(checkAvailable));
    if (type === "To-Do" && updatedData !== null) {
      updateTodo([...toDo, updatedData]);
    }
    if (type === "On-Going" && updatedData !== null) {
      updateOngoing([...ongoing, updatedData]);
    }
    if (type === "Done" && updatedData !== null) {
      updateDone([...done, updatedData]);
    }
  };

  return (
    <div
      className="panel"
      id={type}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h1 className="text-center">{type}</h1>
      {dataList.map((stickerData) => {
        return <Sticker key={stickerData.id} stickerData={stickerData} />;
      })}
    </div>
  );
}
