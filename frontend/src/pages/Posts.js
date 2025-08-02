// src/pages/Posts.js
import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await API.get('/posts');
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>

      <button onClick={() => navigate('/create')}>
        ➕ Create New Post
      </button>

      {posts.map((post, index) => (
        <div key={index} style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <small>Author: {post.author}</small>
        </div>
      ))}
    </div>
  );
};

export default Posts;
