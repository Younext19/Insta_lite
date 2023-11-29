import axios from "./default.instance";

// Admin Dashboard
export const getUser = async () => {
  try {
    return await axios.get("/users/");
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

// Admin Dashboard
export const getUsers = async (page = 0, size = 10) => {
  try {
    return await axios.get(`/users/all/?pageNumber=${page}&pageSize=${size}`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

// Admin Dashboard
export const getCsv = async () => {
  try {
    return await axios.get(`/users/export-to-csv/`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

// Admin Dashboard
export const postBan = async (id) => {
  try {
    return await axios.put(`/users/${id}/ban/`);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};

//Admin Dashboard
// User Profile
export const putUser = async (data) => {
  try {
    return await axios.put(`/users/`, data);
  } catch (error) {
    throw new Error(error?.response?.data);
  }
};
