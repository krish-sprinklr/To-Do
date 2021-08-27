import {
  types,
  UPDATE_TODO,
  UPDATE_ONGOING,
  UPDATE_DONE,
  UPDATE_ALL,
  DELETE_CARD,
} from "../../Utils/constants";
import { handleFilter } from "../Action";

function reducer(state, action) {
  switch (action.type) {
    case UPDATE_ALL:
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
        ...state,
        [action.payload.type]: handleFilter(
          state[action.payload.type],
          action.payload.id
        ),
      };
    default:
      return state;
  }
}

export default reducer;
