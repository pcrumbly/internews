import React, { useState, useContext, useReducer, useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext';
import { serverTimestamp } from 'firebase/firestore';

function SubmitLink() {
  const state = useGlobalState(); 
  const dispatch = useGlobalDispatch();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [linkUID, setLinkUID] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the user exists
    if (!state.user) {
      console.error("User not authenticated");
      return;
    }
  
    const userId = state.user.uid;
  
    try {
      
      const newLink = {
                          description: description,
                          url: url,
                          createdBy: userId,
                          votedOn: [],
                      }
      // Attempt to add the link
      const linkDocRef = await dispatch.addLink();
      console.log("Link added successfully! Link UID: " + linkDocRef.id);
  
      // Clear the input fields
      setDescription(''); 
      setUrl('');
      setLinkUID(linkDocRef.id);      
  
      // Add a default comment for the link
      await dispatch.addComment(linkUID, {
        linkUID: linkUID,
        parentCommentId: null,
        createdBy: userId,
        text: "Thanks for adding this link " + state.user.displayName + "!"
      });
    } catch (error) {
      console.error("Error:", error);
      // Maybe set some local state to notify the user of the error.
    }
  };
  
  

  if (!state.user) return null; // Do not display the form if the user is not logged in

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <input 
        type="url" 
        placeholder="URL" 
        value={url} 
        onChange={e => setUrl(e.target.value)} 
      />
      <button type="submit">Submit Link</button>
    </form>
  );
}

export default SubmitLink;
