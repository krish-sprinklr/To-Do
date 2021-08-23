const types = {
  TODO: "To-Do",
  ONGOING: "Ongoing",
  DONE: "Done",
};

const INTIALISE = "INTIALISE";
const DELETE_CARD = "DELETE_CARD";
const UPDATE_TODO = `UPDATE_${types.TODO}`;
const UPDATE_ONGOING = `UPDATE_${types.ONGOING}`;
const UPDATE_DONE = `UPDATE_${types.DONE}`;
const key = "TODO_APP";

export {
  types,
  INTIALISE,
  UPDATE_TODO,
  UPDATE_ONGOING,
  UPDATE_DONE,
  DELETE_CARD,
  key,
};
