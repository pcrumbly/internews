import React, { useEffect } from 'react';
import { ui, uiConfig } from '../../services/firebase';

function Login() {
  
  useEffect(() => {
    // Start the FirebaseUI widget
    ui.start('#firebaseui-auth-container', uiConfig);
    
    // Cleanup the UI on unmount
    return () => {
      ui.reset();
    };
  }, []);

  return (
    <div>
      <h1>Login/Register</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Login;
