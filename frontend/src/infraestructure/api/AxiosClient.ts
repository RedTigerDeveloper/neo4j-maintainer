import axios from "axios";

const API = process.env.REACT_APP_NEO4J_MAINTAINER_URL
console.log('api url', API)
const AxiosClient = axios.create({
  baseURL: API,
});

// AxiosClient.interceptors.response.use(
//   res => res,
//   err => {
//     console.log('ERROR INTERCEPTED', err.response.status)
//     // throw err;
//   }
// );

export default AxiosClient
