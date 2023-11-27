import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3052/v1/api/",
  timeout: 20000,
});

// Add a request interceptor
request.interceptors.request.use(
  async (config) => {
    // console.log("request interceptor ==== ", config);
    // const access_token = await localStorage.getItem(ACCESS_TOKEN);
    // if (access_token)
    // config.headers["x-api-key"] = "310800";
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const access_token = JSON.parse(localStorage.getItem('accessToken'))
    config.headers["x-client-id"] = userInfo?._id || '';
    config.headers["authorization"] = access_token || ''
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log("err_response_interceptor_account", error);
    // const originalRequest = error?.response?.config;
    // refresh token expired
    // if (
    //   error?.response?.status === 401 &&
    //   originalRequest?.url === `refresh_token`
    // ) {
    //   store.dispatch(requestLogout())
    //   return Promise.reject(error);
    // }
    return Promise.reject(error);
  }
);

const apiClient = {
  get: (url, data = {}) => {
    // console.log('url get: ', url, data);
    return request({
      method: "get",
      url,
      params: data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  post: (url, data) => {
    // console.log('post ', { url }, { data });
    return request({
      method: "post",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  },
  delete: (url, data, headers = {}) =>
    request({
      method: "delete",
      url,
      data,
      headers,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  put: (url, data) =>
    request({
      method: "put",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
  patch: (url, data) =>
    request({
      method: "patch",
      url,
      data,
    })
      .then((response) => response)
      .catch((err) => {
        throw err;
      }),
};

export { apiClient };
