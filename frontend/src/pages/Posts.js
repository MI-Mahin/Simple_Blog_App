import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPosts, setExpandedPosts] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/posts');
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const toggleExpanded = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const getDisplayText = (text, postId, maxLength = 300) => {
    if (text.length <= maxLength || expandedPosts.has(postId)) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  const formatAuthor = (author) => {
    return author || 'Anonymous';
  };

  if (loading) {
    return (
      <div className="posts-container">
        <div className="loading"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <div className="posts-header">
          <h2>Error</h2>
          <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>
          <div className="header-actions">
            <button className="btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="container">
        <div className="posts-header">
          <h2>✨ Blog Posts</h2>
          <div className="header-actions">
            <button 
              className="btn"
              onClick={() => navigate('/create')}
            >
              ✍️ Write New Post
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>📝 No posts yet!</h3>
            <p>Be the first to share your thoughts with the world.</p>
            <button 
              className="btn"
              onClick={() => navigate('/create')}
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post, index) => (
              <div key={post._id || index} className="post-card">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{getDisplayText(post.body, post._id || index)}</p>
                
                {post.body.length > 300 && (
                  <button 
                    className="read-more-btn"
                    onClick={() => toggleExpanded(post._id || index)}
                  >
                    {expandedPosts.has(post._id || index) ? '📖 Show Less' : '📚 Read More'}
                  </button>
                )}
                
                <div className="post-meta">
                  <span className="post-author">
                    👤 {formatAuthor(post.author)}
                  </span>
                  <span className="post-date">
                    📅 {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;