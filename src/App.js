//import logo from './logo.svg';
import './App.css';
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import UserProfile from './components/Auth/UserProfile';
import Register from './components/Auth/Register';
import Header from './components/Header';
import Links from './components/Link/Links';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <Link to="/register">Register </Link>
          <Link to="/login">Login </Link>
          <Link to="/profile">Profile </Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<div><h1>Welcome to Internews</h1> <Links /></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
