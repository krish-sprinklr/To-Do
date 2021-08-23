import React from "react";
import { v4 as uuidv4 } from "uuid";
import Panel from "./Components/Panel";
import Modal from "./Components/Modal";
import { getDataFromStorage, setDataToStorage } from "./Utils/service";
import {
  types,
  INTIALISE,
  UPDATE_TODO,
  UPDATE_ONGOING,
  UPDATE_DONE,
  DELETE_CARD,
  key,
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

const handleFilterAction = (arr, id) => {
  return arr.filter((data) => String(data.id) !== String(id));
};

function reducer(state, action) {
  switch (action.type) {
    case INTIALISE:
      return {
        ...action.payload,
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
    case DELETE_CARD:
      return {
        [types.TODO]: handleFilterAction(state[types.TODO], action.payload),
        [types.ONGOING]: handleFilterAction(
          state[types.ONGOING],
          action.payload
        ),
        [types.DONE]: handleFilterAction(state[types.DONE], action.payload),
      };
    default:
      return state;
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
    setLoading(true);
    let data = getDataFromStorage(key);
    if (data === null) {
      setDataToStorage(key, JSON.stringify(initialState));
      setLoading(false);
      return;
    }
    data = JSON.parse(data);
    dispatch({
      type: INTIALISE,
      payload: data,
    });
    setLoading(false);
  }, []);

  React.useEffect(() => {
    setDataToStorage(key, JSON.stringify(state));
  });

  const Loader = () => {
    return (
      <div className="text-center">
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
      <h3 className="p-1 header">To-Do App</h3>
      {loading ? (
        <Loader />
      ) : (
        <ul className="panel-container list">
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
        </ul>
      )}
    </div>
  );
}

export default App;
