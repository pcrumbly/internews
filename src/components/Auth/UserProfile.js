// src/components/Auth/UserProfile.js

import React, { useEffect, useState } from 'react';
import { auth, firestore} from '../../services/firebase';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <img src={user.photoURL} alt={user.displayName} />
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserProfile;