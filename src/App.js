//import logo from './logo.svg';
import './App.css';
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import UserProfile from './components/Auth/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to Internews</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
