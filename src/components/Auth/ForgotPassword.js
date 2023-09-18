import React from 'react';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

function ForgotPassword() {
  const { user } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const sendResetEmail = () => {
    if (user && user.email) {
      dispatch({ type: "SEND_PASSWORD_RESET_EMAIL", payload: { email: user.email } });
    } else {
      console.error("No user email available to send a password reset.");
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
