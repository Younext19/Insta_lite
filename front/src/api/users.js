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
