import React, { useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      // Cleanup on unmount 
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      //Redirect to the home page
      navigate('/');
      console.log(user.displayName + " logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Logout;