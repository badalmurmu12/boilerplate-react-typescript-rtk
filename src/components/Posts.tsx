// src/components/Posts.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  setSelectedPost,
  fetchPostComments,
  clearSelectedPost,
} from '../store/slices/postsSlice';
import { Post } from '../api/services/postsService';

const Posts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, selectedPost, selectedPostComments, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = () => {
    dispatch(
      createPost({
        title: 'New Post',
        body: 'This is a new post',
        userId: 1,
      })
    );
  };

  const handleUpdatePost = (id: number) => {
    dispatch(
      updatePost({
        id,
        title: 'Updated Title',
        body: 'Updated content',
      })
    );
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleSelectPost = async (post: Post) => {
    dispatch(setSelectedPost(post));
    dispatch(fetchPostComments(post.id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleCreatePost}>Create New Post</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Posts List */}
        <div>
          {posts.map((post) => (
            <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <div>
                <button onClick={() => handleSelectPost(post)}>View Details</button>
                <button onClick={() => handleUpdatePost(post.id)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Post Details */}
        {selectedPost && (
          <div style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h2>Selected Post</h2>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>

            <h4>Comments</h4>
            {selectedPostComments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
                <strong>{comment.name}</strong>
                <p>{comment.body}</p>
              </div>
            ))}
            <button onClick={() => dispatch(clearSelectedPost())}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;