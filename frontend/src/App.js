import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  useEffect(() => {
    // Set the page title
    document.title = 'BlogApp - Share Your Thoughts';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;