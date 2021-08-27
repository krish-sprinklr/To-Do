import { types } from "./constants";
export const getBorderClass = (type) => {
  const color =
    type === types.TODO ? "red" : type === types.DONE ? "green" : "orange";
  return color;
};
