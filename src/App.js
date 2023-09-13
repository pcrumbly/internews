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
import CreateLink from './components/Link/CreateLink';


function App() {

  
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<div><h1>Welcome to InterNews</h1> <Links /></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<CreateLink />} />
      </Routes>
    </Router>
  );
}

export default App;
