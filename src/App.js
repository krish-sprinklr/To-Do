import React from "react";
import Panel from "./Components/Panel";
import Input from "./Components/Input";
import toDos from "./Utils/db";

function App() {
  const [toDo, updateTodo] = React.useState([]);
  const [ongoing, updateOngoing] = React.useState([]);
  const [done, updateDone] = React.useState([]);
  const [displayInput, setDisplayInput] = React.useState(false);

  const handleAdd = ({ type, heading, content }) => {
    const newData = {
      heading,
      content,
      id: Date.now(),
    };
    if (type === "to-do") {
      updateTodo([...toDo, newData]);
    }
    if (type === "on-going") {
      updateOngoing([...ongoing, newData]);
    }
    if (type === "done") {
      updateDone([...done, newData]);
    }
  };

  React.useEffect(() => {
    updateTodo(toDos[0]);
    updateOngoing(toDos[1]);
    updateDone(toDos[2]);
  }, []);
  return (
    <div className="App">
      <h1 className="text-center">To-Do App</h1>
      <div className="input-component">
        {!displayInput ? (
          <button
            className="input-button mt-0"
            onClick={() => setDisplayInput(true)}
          >
            Add To-Do
          </button>
        ) : (
          <Input handleAdd={handleAdd} />
        )}
      </div>
      <hr />
      <div className="panel-container">
        <Panel
          type="To-Do"
          data={toDo}
          state={{ toDo, ongoing, done, updateDone, updateOngoing, updateTodo }}
        />
        <Panel
          type="On-Going"
          data={ongoing}
          state={{ toDo, ongoing, done, updateDone, updateOngoing, updateTodo }}
        />
        <Panel
          type="Done"
          data={done}
          state={{ toDo, ongoing, done, updateDone, updateOngoing, updateTodo }}
        />
      </div>
    </div>
  );
}

export default App;
