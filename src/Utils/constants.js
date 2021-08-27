const types = {
  TODO: "To-Do",
  ONGOING: "Ongoing",
  DONE: "Done",
};

const typesArr = ["TODO", "ONGOING", "DONE"];

const DELETE_CARD = "DELETE_CARD";
const UPDATE_TODO = `UPDATE_${types.TODO}`;
const UPDATE_ONGOING = `UPDATE_${types.ONGOING}`;
const UPDATE_DONE = `UPDATE_${types.DONE}`;
const UPDATE_ALL = "UPDATE_ALL";
const localStorageKey = "TODO_APP";

export {
  types,
  typesArr,
  UPDATE_TODO,
  UPDATE_ONGOING,
  UPDATE_DONE,
  DELETE_CARD,
  UPDATE_ALL,
  localStorageKey,
};
