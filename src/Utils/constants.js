const types = {
  TODO: "To-Do",
  ONGOING: "Ongoing",
  DONE: "Done",
};

const INTIALISE = "INTIALISE";
const UPDATE_TODO = `UPDATE_${types.TODO}`;
const UPDATE_ONGOING = `UPDATE_${types.ONGOING}`;
const UPDATE_DONE = `UPDATE_${types.DONE}`;

export { types, INTIALISE, UPDATE_TODO, UPDATE_ONGOING, UPDATE_DONE };
