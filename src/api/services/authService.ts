import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },

  register: (userData: any): Promise<AxiosResponse<any>> => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  refreshToken: (refreshToken: string): Promise<AxiosResponse<any>> => {
    return axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  },
};
