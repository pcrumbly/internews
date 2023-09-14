import React from 'react';
import { auth } from '../../services/firebase';  // Adjust the path to your Firebase configuration

function ForgotPassword() {

  const sendResetEmail = async () => {
    try {
      const currentUserEmail = auth.currentUser.email; 
      await auth.sendPasswordResetEmail(currentUserEmail);
      console.log("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div>
      <button onClick={sendResetEmail}>
        Send Password Reset Email
      </button>
    </div>
  );
}

export default ForgotPassword;
