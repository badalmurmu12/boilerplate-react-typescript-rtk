export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
    },
    USERS: {
      GET_ALL: '/users',
      GET_BY_ID: (id: string) => `/users/${id}`,
      UPDATE: (id: string) => `/users/${id}`,
      DELETE: (id: string) => `/users/${id}`,
    },
    POSTS: {
      GET_ALL: '/posts',
      GET_BY_ID: (id: number) => `/posts/${id}`,
      CREATE: '/posts',
      UPDATE: (id: number) => `/posts/${id}`,
      DELETE: (id: number) => `/posts/${id}`,
      GET_BY_USER: (userId: number) => `/users/${userId}/posts`,
      GET_COMMENTS: (postId: number) => `/posts/${postId}/comments`,
    },
  };