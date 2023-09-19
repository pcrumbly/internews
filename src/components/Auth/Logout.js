import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

/**
 * Logout function.
 * 
 * This function logs out the user by: 
 *  calling the signOut function,
 *  redirecting to the home page, 
 *  and logging a success message.
 * If an error occurs during the logout process, an error message is logged.
 * 
 * returns {JSX.Element} - The logout button component
 */
function Logout() {
  // Get user state and dispatch functions from global state
  const { user } = useGlobalState();
  const { signOut } = useGlobalDispatch();
  // Get the navigate function from react-router-dom
  const navigate = useNavigate();


  useEffect(() => {
    // Redirect to the login page if the user is not logged in
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  /**
   * logout()
   * 
   * Logout handler.
   * 
   * This async function calls the signOut function,
   *  waits for it to complete, 
   *  redirects to the home page,
   *  and logs a success message.
   * If an error occurs during the logout process, an error message is logged.
   */
  const logout = async () => {
    
    try {
      // Call the signOut function from the global state
      await signOut();
      // Redirect to the home page using react-router-dom
      navigate('/');
      // Log a success message
      console.log(`${user?.displayName || user?.email} logged out successfully`);

    } catch (error) {
      // Log an error message
      console.error("Error logging out:", error);
    }
  };

  // Render logout button
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Logout;
