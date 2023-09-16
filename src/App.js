//import logo from './logo.svg';
import './App.css';

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalStateContext';

import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import UserProfile from './components/Auth/UserProfile';
import Register from './components/Auth/Register';
import Header from './components/Header';
import Links from './components/Link/Links';
import SubmitLink from './components/Link/SubmitLink';
import ForgotPassword from './components/Auth/ForgotPassword';



function App() {
    
  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<div><h1>Welcome to InterNews</h1> <Links /></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit" element={<SubmitLink />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
