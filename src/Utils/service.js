const getDataFromStorage = (key) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localStorage.getItem(key));
    }, 1000);
  });
};

const setDataToStorage = (key, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localStorage.setItem(key, data));
    }, 1000);
  });
};

export { getDataFromStorage, setDataToStorage };
