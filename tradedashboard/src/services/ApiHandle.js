import axios from "axios";
import { postRefershToken } from "./UserServices";

const apiUrl = process.env.REACT_APP_API_URL;

const apiHandle = axios.create({
  baseURL: apiUrl,
  responseType: "json",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Origin": "*",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const refreshToken = async () => {
  const data=JSON.parse(localStorage.getItem("googledata"))

  const Obj1={
    refresh: data.refresh_token,
    email: localStorage.getItem("email"),
  }


  try {
    const response = await postRefershToken(Obj1)
    return response.data.access;
  } catch (error) {
if(error.response.status === 400 ){
 
  localStorage.clear();
  window.location.href = "/login";
  }else{
     
    localStorage.clear();
    window.location.href = "/login";
  }
}
};

apiHandle.interceptors.request.use(
  (config) => {
    const loginEndpoint = `${apiUrl}/login`;
    const refreshEndpoint = `${apiUrl}/api/token/refresh`;

    if (config.url !== loginEndpoint && config.url !== refreshEndpoint) {
      const token = JSON.parse(localStorage.getItem("googledata"))?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    config.headers.Origin = `https://www.tradershub.ninja`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiHandle.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiHandle(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        refreshToken()
     
        .then((token ) => {
          
          const data = JSON.parse(localStorage.getItem("googledata"));
          localStorage.setItem("googledata", JSON.stringify({ ...data, access_token: token }));
            apiHandle.defaults.headers.Authorization = `Bearer ${token}`;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            processQueue(null, token);
            resolve(apiHandle(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    console.error(error);
    return Promise.reject(error);
  }
);

export default apiHandle;
