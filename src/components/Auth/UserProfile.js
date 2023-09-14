import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, firestore } from '../../services/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(firestore, 'points'), where('uid', '==', currentUser.uid));
        const userSnapshot = await getDocs(q);

        if (userSnapshot.empty) {
          const pointsData = {
            uid: currentUser.uid,
            points: 0
          };
          await addDoc(collection(firestore, 'points'), pointsData);
          console.log("User added successfully!");
        } else {
          setPoints(userSnapshot.docs[0].data().points);
        }
      }
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
      <p>Points: {points}</p>
      <p><Link to={user ? "/logout" : "/"}>{user ? "Logout" : "Home"}</Link></p>
      <p><a href="/reset-password">Reset Password</a></p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserProfile;
