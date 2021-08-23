const getDataFromStorage = (key) => {
  return localStorage.getItem(key);
};

const setDataToStorage = (key, data) => {
  localStorage.setItem(key, data);
};

export { getDataFromStorage, setDataToStorage };
