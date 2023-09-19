import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ui, uiConfig } from '../../services/firebase';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

/**
 * Register()
 * Register component for user registration.
 * 
 * This component uses the FirebaseUI widget for registration and displays a registration form.
 * If the user is already logged in, it redirects to the home page.
 * If there is an error during registration, it logs the error.
 */
function Register() {
  const { user, error } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const navigate = useNavigate();

  // Redirect to the home page if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  
  useEffect(() => {
    // Start the FirebaseUI widget for registration
    ui.start('#firebaseui-register-container', uiConfig);

    // Optionally, check for errors after registration attempts
    if (error) {
      console.error("Registration Error:", error);
      // You can also display this error in your component
    }

    // Cleanup the UI on unmount
    return () => {
      ui.reset();
    };
  }, [error]);

  // Render the registration form 
  return (
    <div>
      <h1>Register</h1>
      <div id="firebaseui-register-container"></div>
    </div>
  );
}

export default Register;
