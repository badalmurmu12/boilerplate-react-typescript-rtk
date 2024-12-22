import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { postService, Post, Comment } from '../../api/services/postsService';

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  selectedPostComments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  selectedPostComments: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getAllPosts();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await postService.getPostById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: Omit<Post, 'id'>, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(postData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, ...postData }: Partial<Post> & { id: number }, { rejectWithValue }) => {
    try {
      const response = await postService.updatePost(id, postData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    try {
      await postService.deletePost(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete post');
    }
  }
);

export const fetchPostComments = createAsyncThunk(
  'posts/fetchPostComments',
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await postService.getPostComments(postId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch comments');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = null;
      state.selectedPostComments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch posts';
      })
      // Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.selectedPost?.id === action.payload.id) {
          state.selectedPost = action.payload;
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
        if (state.selectedPost?.id === action.payload) {
          state.selectedPost = null;
        }
      })
      // Fetch comments
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.selectedPostComments = action.payload;
      });
  },
});

export const { setSelectedPost, clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;