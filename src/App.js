//import logo from './logo.svg';
import './App.css';
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import UserProfile from './components/Auth/UserProfile';
import Register from './components/Auth/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <h1><a href="/">InterNews</a></h1>
        
        <nav>
          <Link to="/register">Register </Link>
          <Link to="/login">Login </Link>
          <Link to="/profile">Profile </Link>
          {/* Add other links as needed */}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<h1>Welcome to Internews</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
