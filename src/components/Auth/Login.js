import React, { useEffect } from 'react';
import { ui, uiConfig } from '../../services/firebase';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';



/**
 * Login function
 * Renders the login component.
 *
 * @return {JSX.Element} The login component.
 */
const Login = () => {
  // Get user state and dispatch functions from global state
  const { user, error } = useGlobalState();
  const { signOut } = useGlobalDispatch();


  useEffect(() => {
    // Start FirebaseUI for authentication
    ui.start('#firebaseui-auth-container', uiConfig);

    // Cleanup the UI on unmount
    return () => {
      ui.reset();
    };
  }, []); // Could only re-run on uiConfig change as well

  useEffect(() => {
    // This checks if there's an error after the user tries to log in
    if (error) {
      console.error("Authentication Error:", error);
      // You can also display this error in your component
    }
  }, [error]); // Only re-run the effect if 'error' changes


  // Render Login button
  return (
    <div>
      { user ? (
        <div>
          <p>Welcome, {user.displayName || user.email}!</p>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in:</p>
          <div id="firebaseui-auth-container"></div>
        </div>
      )}
    </div>
  );
}

export default Login;
