//import logo from './logo.svg';
import './App.css';

// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { auth } from './services/firebase';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import UserProfile from './components/Auth/UserProfile';
import Register from './components/Auth/Register';
import Header from './components/Header';
import Links from './components/Link/Links';
import CreateLink from './components/Link/CreateLink';
import ForgotPassword from './components/Auth/ForgotPassword';
import Comments from './components/Comments/Comments';



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // this will observe the authentication state and set the current user accordingly
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Cleanup the observer on unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <Router>
      <div className="App">
        <Header user={currentUser} />
      </div>
      <Routes>
        <Route path="/" element={<div><h1>Welcome to InterNews</h1> <Links /></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<CreateLink />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/comments/:linkUID" element={<Comments />} />
      </Routes>
    </Router>
  );
}

export default App;
