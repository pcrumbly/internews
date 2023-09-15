import React, { useEffect, useState } from 'react';
import { ui, uiConfig, auth } from '../../services/firebase';
import Logout from '../Auth/Logout';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Start the FirebaseUI widget
    if (!user) {
      ui.start('#firebaseui-auth-container', uiConfig);
    }
    
    // Listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      // Cleanup on unmount
      unsubscribe();
      ui.reset();
      
    };
  }, []);

  return (
    <div>
      <h1>Login</h1>

      {/* Check if the user is logged in */}
      {user ? (
        // User is logged in, display welcome message and logged-in content
        <div>
          <p>Welcome, {user.displayName}!<Logout /></p>
          <p>Submit a link and comment.</p>
          <Link to="/submit">Submit</Link>
          
          {/* Add your logged-in content here */}
        </div>
      ) : (
        // User is not logged in, display the Firebase UI for signing in
        <div>
          <p>Sign in or register to continue:</p>
          {/* Container for the FirebaseUI widget */}
          <div id="firebaseui-auth-container"></div>
        </div>
      )}

      
    </div>
  );
}

export default Login;