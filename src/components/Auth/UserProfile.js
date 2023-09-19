import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext.js';

function UserProfile() {
  const { user } = useGlobalState();
  const [points, setPoints] = useState(0);
  const { updateUserPoints } = useGlobalDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPoints = async () => {
      if (user) {

        await updateUserPoints(user.uid);

        const q = query(collection(firestore, 'points'), where('uid', '==', user.uid));
        const userSnapshot = await getDocs(q);

        if (userSnapshot.empty) {
          const pointsData = {
            uid: user.uid,
            points: 0
          };
          await addDoc(collection(firestore, 'points'), pointsData);
          console.log("User added successfully!");
        } else {
          setPoints(userSnapshot.docs[0].data().points);
        }
      }
    };

    fetchPoints();
  }, [user, updateUserPoints]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Profile</h1>
      <img src={user.photoURL} alt={user.displayName} />
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>Points: {points}</p>
      <p><Link to={user ? "/logout" : "/"}>{user ? "Logout" : "Home"}</Link></p>
      <p><Link to="/forgot-password">Reset Password</Link></p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserProfile;
