import { DELETE_CARD } from "../../Utils/constants";
import { getDataFromStorage, setDataToStorage } from "../../Utils/service";
import { localStorageKey } from "../../Utils/constants";

export const handleFilter = (arr, id) => {
  return arr.filter((data) => String(data.id) !== String(id));
};

export const updateCardAction = (data, type) => {
  return { type: `UPDATE_${type}`, payload: data };
};

export const deleteCardAction = async (id, type, dispatch) => {
  dispatch({ type: DELETE_CARD, payload: { id, type } });
  let data = await getDataFromStorage(localStorageKey);
  data = JSON.parse(data);
  data = {
    ...data,
    [type]: data[type].filter((temp) => temp.id !== id),
  };
  setDataToStorage(localStorageKey, JSON.stringify(data));
};
