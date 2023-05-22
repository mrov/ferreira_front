import axios, { AxiosResponse } from "axios";
import IUserFilter from "../utils/interfaces/IUserFilter";
import { IUserPagination, IUserForm, Status } from "../utils/interfaces/IUser";

const API_URL = "https://localhost:7059";

const getUserData = async (
  filter: IUserFilter
): Promise<AxiosResponse<IUserPagination>> => {
  try {
    const response = await axios.get<IUserPagination>(`${API_URL}/Api/User`, {
      params: filter,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (userData: Partial<IUserForm>) => {
  try {
    const response = await axios.post(`${API_URL}/Api/User`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};

const editUser = async (userData: Partial<IUserForm>) => {
  try {
    const response = await axios.put(
      `${API_URL}/Api/User/${userData.id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to Edit user");
  }
};

const editUserStatus = async (userData: Partial<IUserForm>, status: Status) => {
  try {
    const response = await axios.put(
      `${API_URL}/Api/User/${userData.id}/Status`,
      { Status: Number(status) }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to Edit user status");
  }
};

const deleteUser = async (userId: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${API_URL}/api/User/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAllUsers = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`${API_URL}/Api/User/DeleteAll`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getUserData,
  createUser,
  editUser,
  editUserStatus,
  deleteUser,
  deleteAllUsers,
};
