import axios from "axios";

let apiUrl = "http://localhost:8082/";

// get posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${apiUrl}posts`);
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
