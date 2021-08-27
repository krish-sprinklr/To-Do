import React from "react";
import reducer from "./Reducer/Reducer";
import { getDataFromStorage, setDataToStorage } from "./Utils/service";
import { types, UPDATE_ALL, localStorageKey } from "./Utils/constants";

const initialState = {
  [types.TODO]: [],
  [types.ONGOING]: [],
  [types.DONE]: [],
};

const useDataFetcher = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let data = await getDataFromStorage(localStorageKey);
      if (data === null) {
        setDataToStorage(localStorageKey, JSON.stringify(initialState));
        setLoading(false);
        return;
      }
      data = JSON.parse(data);
      dispatch({
        type: UPDATE_ALL,
        payload: data,
      });
      setLoading(false);
    };
    getData();
  }, []);

  return [state, dispatch, loading];
};

export default useDataFetcher;
