import axios from "axios";

let apiUrl = "http://localhost:8082/";

// get posts with token on /images
export const getPosts = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getPostsAnonyme = async () => {
  try {
    const response = await axios.get(`${apiUrl}images`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// delete post
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getImagePost = async (name, token) => {
  try {
    const response = await axios.get(`${apiUrl}images/download/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getImagePostAnonyme = async (name) => {
  try {
    const response = await axios.get(`${apiUrl}images/download/${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const deletePostImage = async (name, token) => {
  try {
    const response = await axios.delete(`${apiUrl}images/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// add post with form data on url /images/upload
export const addPost = async (token, formData) => {
  try {
    const response = await axios.post(`${apiUrl}images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // form data
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
