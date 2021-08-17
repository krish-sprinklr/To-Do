import React from "react";
import { v4 as uuidv4 } from "uuid";
import Panel from "./Components/Panel";
import Modal from "./Components/Modal";
import toDos from "./Utils/db";
import {
  types,
  INTIALISE,
  UPDATE_TODO,
  UPDATE_ONGOING,
  UPDATE_DONE,
} from "./Utils/constants";

// Create a unique ID (guid)
// Use constants for declaring the types
// Add loader
// Create a config for the panel
// Refactor number of states
// Add reducers
// Remove multiple if statements
// Add "add" button under every list
// Make every components pure

const initialState = {
  [types.TODO]: [],
  [types.ONGOING]: [],
  [types.DONE]: [],
};

function reducer(state, action) {
  switch (action.type) {
    case INTIALISE:
      return {
        [types.TODO]: action.payload[0],
        [types.ONGOING]: action.payload[1],
        [types.DONE]: action.payload[2],
      };
    case UPDATE_TODO:
      return {
        ...state,
        [types.TODO]: action.payload,
      };
    case UPDATE_ONGOING:
      return {
        ...state,
        [types.ONGOING]: action.payload,
      };
    case UPDATE_DONE:
      return {
        ...state,
        [types.DONE]: action.payload,
      };
    default:
      throw new Error();
  }
}

const addSubmit = (Component) => {
  return (props) => {
    const { state, dispatch, type } = props;
    const [modalState, setModalState] = React.useState(false);

    const handleAdd = ({ heading, content }) => {
      const newData = {
        heading,
        content,
        id: uuidv4(),
      };
      dispatch({ type: `UPDATE_${type}`, payload: [...state[type], newData] });
      setModalState(false);
    };

    const openModal = () => {
      setModalState(true);
    };
    return (
      <>
        <Component {...props} openModal={openModal} />
        {modalState ? (
          <Modal onClose={() => setModalState(false)} handleAdd={handleAdd} />
        ) : null}
      </>
    );
  };
};

const PanelWithButton = addSubmit(Panel);

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await toDos();
      dispatch({
        type: INTIALISE,
        payload: data,
      });
      setLoading(false);
    };
    getData();
  }, []);

  const Loader = () => {
    return (
      <div class="text-center">
        <h1>Loading...</h1>
        <img
          src="https://emoji.gg/assets/emoji/7451_dance.gif"
          width="64px"
          height="64px"
          alt="dance"
        />
      </div>
    );
  };

  return (
    <div className="App">
      <h1 className="text-center">To-Do App</h1>
      <hr />
      {loading ? (
        <Loader />
      ) : (
        <div className="panel-container">
          {Object.keys(types).map((type) => {
            return (
              <PanelWithButton
                key={types[type]}
                type={types[type]}
                state={state}
                dispatch={dispatch}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
