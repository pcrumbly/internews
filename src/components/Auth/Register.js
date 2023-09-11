import React, { useEffect } from 'react';
import { ui, uiConfig } from '../../services/firebase';

function Register() {
  
  useEffect(() => {
    // Start the FirebaseUI widget for registration
    ui.start('#firebaseui-register-container', uiConfig);
    
    // Cleanup the UI on unmount
    return () => {
      ui.reset();
    };
  }, []);

  return (
    <div>
      <h1>Register</h1>
      <div id="firebaseui-register-container"></div>
    </div>
  );
}

export default Register;
