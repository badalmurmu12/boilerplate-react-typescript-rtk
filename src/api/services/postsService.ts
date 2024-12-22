import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { API_ENDPOINTS } from '../endpoints';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  email: string;
  name: string;
}

export const postService = {
  getAllPosts: (): Promise<AxiosResponse<Post[]>> => {
    return axiosInstance.get(API_ENDPOINTS.POSTS.GET_ALL);
  },

  getPostById: (id: number): Promise<AxiosResponse<Post>> => {
    return axiosInstance.get(API_ENDPOINTS.POSTS.GET_BY_ID(id));
  },

  createPost: (postData: Omit<Post, 'id'>): Promise<AxiosResponse<Post>> => {
    return axiosInstance.post(API_ENDPOINTS.POSTS.CREATE, postData);
  },

  updatePost: (id: number, postData: Partial<Post>): Promise<AxiosResponse<Post>> => {
    return axiosInstance.put(API_ENDPOINTS.POSTS.UPDATE(id), postData);
  },

  deletePost: (id: number): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(API_ENDPOINTS.POSTS.DELETE(id));
  },

  getPostsByUser: (userId: number): Promise<AxiosResponse<Post[]>> => {
    return axiosInstance.get(API_ENDPOINTS.POSTS.GET_BY_USER(userId));
  },

  getPostComments: (postId: number): Promise<AxiosResponse<Comment[]>> => {
    return axiosInstance.get(API_ENDPOINTS.POSTS.GET_COMMENTS(postId));
  },
};

export default postService;