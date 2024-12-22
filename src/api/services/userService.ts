import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export interface User {
  id: string;
  name: string;
  email: string;
  // Add more user properties as needed
}

export const userService = {
  getAllUsers: (): Promise<AxiosResponse<User[]>> => {
    return axiosInstance.get(API_ENDPOINTS.USERS.GET_ALL);
  },

  getUserById: (id: string): Promise<AxiosResponse<User>> => {
    return axiosInstance.get(API_ENDPOINTS.USERS.GET_BY_ID(id));
  },

  updateUser: (id: string, userData: Partial<User>): Promise<AxiosResponse<User>> => {
    return axiosInstance.put(API_ENDPOINTS.USERS.UPDATE(id), userData);
  },

  deleteUser: (id: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(API_ENDPOINTS.USERS.DELETE(id));
  },
};
