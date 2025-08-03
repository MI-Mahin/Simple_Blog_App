import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!post.title.trim()) newErrors.title = 'Title is required';
    if (post.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    if (!post.body.trim()) newErrors.body = 'Content is required';
    if (post.body.length < 10) newErrors.body = 'Content must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await API.post('/posts', post);
      alert('Post created successfully!');
      navigate('/posts');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to create post. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (post.title || post.body) {
      if (window.confirm('Are you sure you want to discard your changes?')) {
        navigate('/posts');
      }
    } else {
      navigate('/posts');
    }
  };

  const wordCount = post.body.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>✍️ Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="title"
              type="text"
              placeholder="Enter your post title..."
              value={post.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              maxLength="100"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginTop: '5px' }}>
              {errors.title && <span className="error-text">{errors.title}</span>}
              <span style={{ marginLeft: 'auto' }}>{post.title.length}/100</span>
            </div>
          </div>
          
          <div className="form-group">
            <textarea
              name="body"
              placeholder="Share your thoughts..."
              value={post.body}
              onChange={handleChange}
              className={errors.body ? 'error' : ''}
              rows="8"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginTop: '5px' }}>
              {errors.body && <span className="error-text">{errors.body}</span>}
              <span style={{ marginLeft: 'auto' }}>{wordCount} words</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <button type="submit" className="btn" disabled={loading} style={{ flex: 1 }}>
              {loading ? '✨ Publishing...' : '🚀 Publish Post'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={handleCancel}
              disabled={loading}
              style={{ flex: 1 }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
        
        <div className="nav-link">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/posts'); }}>
            ← Back to Posts
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;