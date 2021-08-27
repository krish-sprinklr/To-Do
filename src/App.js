import React from "react";
import Panel from "./components/Panel";
import Loader from "./components/Loader";
import addSubmitHOC from "./components/HOC/addSubmitHOC";
import { types, typesArr } from "./Utils/constants";
import useDataFetcher from "./useDataFetcherHook";

const PanelWithButton = addSubmitHOC(Panel);

function App() {
  const [state, dispatch, loading] = useDataFetcher();
  return (
    <div className="App">
      <h3 className="p-1 header">To-Do App</h3>
      {loading ? (
        <Loader />
      ) : (
        <ul className="panel-container list" aria-label="to-do">
          {typesArr.map((type) => {
            return (
              <PanelWithButton
                key={types[type]}
                type={types[type]}
                state={state}
                dispatch={dispatch}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
