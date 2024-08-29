import axios from "axios";

let apiUrl = "http://localhost:8082/";

export const signup = (user) => {
  return axios.post(apiUrl + "inscription", user);
};

export const login = (user) => {
  return axios.post(apiUrl + "connexion", user);
};
