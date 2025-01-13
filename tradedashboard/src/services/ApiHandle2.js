import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const apiHandleD = axios.create({
  baseURL: apiUrl,
  responseType: "json",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "origin": "https://tradingterminal.com",
  },
  
});

apiHandleD.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("googledata"))?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Origin = `https://www.tradershub.ninja`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiHandleD.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default apiHandleD;

