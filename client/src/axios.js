import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});
instance.interceptors.request.use(
  function (config) {
    let localStorageData = window.localStorage.getItem("persist:appchat/user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);
      config.headers = { authorization: `Bearer ${accessToken}` };
      return config;
    } else {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log("object");
    return error?.response?.data;
  }
);

export default instance;
