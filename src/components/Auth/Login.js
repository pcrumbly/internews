import React, { useEffect, useState } from 'react';
import { ui, uiConfig, auth } from '../../services/firebase';

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Start the FirebaseUI widget
    ui.start('#firebaseui-auth-container', uiConfig);

    // Listen for changes in the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      // Cleanup on unmount
      ui.reset();
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Login</h1>

      {/* Check if the user is logged in */}
      {user ? (
        // User is logged in, display welcome message and logged-in content
        <div>
          <p>Welcome, {user.displayName}!</p>
          {/* Add your logged-in content here */}
        </div>
      ) : (
        // User is not logged in, display the Firebase UI for signing in
        <div>
          <p>Please sign in:</p>
        </div>
      )}

      {/* Container for the FirebaseUI widget */}
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Login;