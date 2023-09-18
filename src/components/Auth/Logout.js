import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

function Logout() {
  const { user } = useGlobalState();
  const { signOut } = useGlobalDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut();
      // Redirect to the home page
      navigate('/');
      console.log((user?.displayName || user?.email) + " logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Logout;
