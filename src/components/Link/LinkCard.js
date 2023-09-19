import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { doc, getDoc, updateDoc, getDocs, query, where, collection, addDoc } from 'firebase/firestore';
import timeSince from '../../services/myUtils';
import { useGlobalDispatch, useGlobalState } from '../../contexts/GlobalStateContext';
import VoteButton from './VoteButton';
import { Navigate, Link } from 'react-router-dom';
import CommentCard from '../Comments/CommentCard';

function LinkCard({ linkId }) {
  const [link, setLink] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const globalDispatch = useGlobalDispatch();
  const { user } = useGlobalState();
  const [commentsCount, setCommentsCount] = useState(0);
  


  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const linkDocRef = doc(firestore, 'links', linkId);
        const linkSnapshot = await getDoc(linkDocRef);
        if (linkSnapshot.exists()) {
          setLink(linkSnapshot.data());
        }
      } catch (error) {
        console.error('Error fetching link data:', error);
      }
    };

    fetchLinkData();
  }, [linkId]);

  useEffect(() => {
    const fetchCommentsCount = async () => {
        const commentsCollection = collection(firestore, 'comments');
        const q = query(commentsCollection, where("linkUID", "==", linkId));
        const commentsSnapshot = await getDocs(q);
        
        setCommentsCount(commentsSnapshot.size);  // Set the count of comments
    };

    fetchCommentsCount();
}, [linkId]);

  const handleVote = async () => {
    if (!user) {
        setRedirectToLogin(true);
        return;
    }

    // Check if the user has already voted
    if (link.votedOn.includes(user.uid)) {
        console.log("User has already voted on this link");
        return;
    }

    // Optimistically update the local state
    setLink(prevLink => ({
      ...prevLink, 
      points: prevLink.points + 1,
      votedOn: [...prevLink.votedOn, user.uid] // add user UID
    }));

    try {
        const linkDocRef = doc(firestore, 'links', linkId);
        const linkDocSnapshot = await getDoc(linkDocRef);
        const currentPoints = linkDocSnapshot.data().points || 0;
        const currentVotedOn = linkDocSnapshot.data().votedOn || [];
        const newPoints = currentPoints + 1;

        await updateDoc(linkDocRef, {
            points: newPoints,
            votedOn: [...currentVotedOn, user.uid]  // add user UID
        });

        console.log("Vote counted!");
    } catch (error) {
        console.error("Error setting vote: ", error);
        // If there's an error, revert the local state
        setLink(prevLink => ({ ...prevLink, points: prevLink.points - 1 }));
    }
};

  
if (redirectToLogin) 
    return <Navigate to="/login" replace />;

if (!link) 
    return <div>Loading...</div>;

  return (
    <table>
      <tbody>
        <tr>
          <td><span></span></td>
          <td><VoteButton onVote={handleVote} /></td>
          <td>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.description}
            </a>
          </td>
          <td>
            <small>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                    ({new URL(link.url).origin}...)
                </a>
            </small>
          </td>
        </tr>
        <tr>
          <td><span></span></td>
          <td>{link.points} points</td>
          <td><small><p>{timeSince(link.createdAt)}</p></small></td>
          <td><Link to={`/comments/${linkId}`}>View all {commentsCount} comments</Link></td>
        </tr>
      </tbody>
    </table>
  );
}

export default LinkCard;
