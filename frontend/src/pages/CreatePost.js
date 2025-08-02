import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', post);
      navigate('/posts');
    } catch (err) {
      alert('Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="body" placeholder="Body" onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePost;
