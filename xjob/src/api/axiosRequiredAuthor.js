import axios from "axios";
import queryString from 'query-string';

const axiosRequiredAuthor = axios.create({
    baseURL : "http://localhost:8080/xjob",
    headers : {
    'content-type': 'application/json'
    },
    paramsSerializer : params => queryString.stringify(params)
});

axiosRequiredAuthor.interceptors.request.use(async (config)=> {
    let token = localStorage.getItem("token");
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosRequiredAuthor.interceptors.response.use((response) => {
    if (response && response.data) {
      return response.data;
    }
  
    return response;
  }, (error) => {
    // Handle errors
    throw error;
  });

export default axiosRequiredAuthor;