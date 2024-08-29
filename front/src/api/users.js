import axios from "axios";

let apiUrl = "http://localhost:8082/";

// get users with bearer token on authorization from local storage
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (token, id) => {
  try {
    const response = await axios.delete(`${apiUrl}users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (token, data) => {
  try {
    const response = await axios.post(`${apiUrl}users/addUser`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editUser = async (token, data, id) => {
  try {
    const response = await axios.put(`${apiUrl}users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// patch user
export const patchUser = async (token, data, id) => {
  try {
    const response = await axios.patch(`${apiUrl}users/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
