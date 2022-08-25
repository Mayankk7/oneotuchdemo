import axios from "axios";

const url = "";

export const getUserById = async (param) => {
  try {
    let response = await axios.get(`${URL}/api/auth/${param}`);
    return response.data; 
  } catch (error) {
    console.log("error while getting user by id", error);
  }
};
