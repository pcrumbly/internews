import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

/**
 * Component for sending a password reset email.
 * Retrieves the user from global state and dispatches an action
 * to send the password reset email if the user's email is available.
 */
function ForgotPassword() {
  // Retrieve user from global state
  const { user } = useGlobalState();
  // Retrieve dispatch from global state
  const dispatch = useGlobalDispatch();
  const navigate = useNavigate();


  
  useEffect(() => {
    // Redirect to the login page if the user is not logged in
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  /**
   * Sends a password reset email if the user and user's email are available.
   * Otherwise, logs an error message.
   */
  const sendResetEmail = () => {
    // Check if the user exists and has an email
    if (user && user.email) {
      // Send the password reset email by calling the dispatch function
      // payload is the user's email
      dispatch({ type: "SEND_PASSWORD_RESET_EMAIL", payload: { email: user.email } });
    } else {
      console.error("No user email available to send a password reset.");
      // Optionally, update the state with the error so that components can react to it.
      // You can also display this error in your component
    }
  };

  // Render the password reset email button
  return (
    <div>
      <button onClick={sendResetEmail}>
        Send Password Reset Email
      </button>
    </div>
  );
}

export default ForgotPassword;
