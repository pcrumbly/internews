import React, { useEffect } from 'react';
import { ui, uiConfig } from '../../services/firebase';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

function Register() {
  const { user, error } = useGlobalState();
  const dispatch = useGlobalDispatch();

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

  return (
    <div>
      <h1>Register</h1>
      <div id="firebaseui-register-container"></div>
    </div>
  );
}

export default Register;
