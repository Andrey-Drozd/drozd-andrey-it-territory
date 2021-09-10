import axios from "axios";

const apiGetTodoList = (signalToken) => {
  const data = new Promise(function (resolve, reject) {
    const url = "https://jsonplaceholder.typicode.com/todos";

    axios
      .get(url, { cancelToken: signalToken })
      .then((res) => {
        if (res?.status === 200) {
          resolve(res);
        } else throw new Error();
      })
      .catch((e) => {
        const errorMessage = e.message;
        reject({ errorMessage: errorMessage });
      });
  });
  return data;
};

export { apiGetTodoList };
