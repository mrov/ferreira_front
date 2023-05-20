import axios from "axios";
import IUserFilter from "../utils/interfaces/IUserFilter";
import { IUser, IUserForm } from "../utils/interfaces/IUser";

const API_URL = 'https://localhost:7059';

const getUserData = async (filter: IUserFilter) => {
  try {
    const response = await axios.get(`${API_URL}/Api/User`, {
      params: filter,
    });

    return response;
    // Process the response data here
  } catch (error) {
    console.error(error);
    // Handle error here
  }
};

const createUser = async (userData: IUserForm) => {
  try {
    const response = await axios.post(`${API_URL}/Api/User`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

const deleteUser = async (userId: string) => {
  // Make the API call to delete the user
  axios.delete(`${API_URL}/api/User/${userId}`)
  .then((response) => {
    // Handle the response as needed
    console.log(response);
    return response;
  })
  .catch((error) => {
    // Handle the error as needed
    console.error(error);
  });
};

const deleteAllUsers = async () => {
  // Make the API call to delete the users
  axios.delete(`${API_URL}/Api/User/DeleteAll`)
  .then((response) => {
    // Handle the response as needed
    console.log(response);
    return response;
  })
  .catch((error) => {
    // Handle the error as needed
    console.error(error);
  });
};

export { getUserData, createUser, deleteUser, deleteAllUsers };
