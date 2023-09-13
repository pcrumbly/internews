import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';


function CreateLink() {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!url || !description) {
        alert("Please fill in both fields!");
        return;
      }
  
      try {
        const linkData = {
          url,
          description,
          createdBy: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          points: 0
        };
  
        await addDoc(collection(firestore, 'links'), linkData);
        console.log("Link added successfully!");
  
        // Optionally, reset the form fields after successful submission
        setUrl('');
        setDescription('');
  
      } catch (error) {
        console.error("Error adding link:", error);
      }
    };
  
    return (
      <div>
        <h2>Create Link</h2>
        <form id='createLinkform' onSubmit={handleSubmit}>
          <input
            id="urlInput"
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <textarea
            id="descInput"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default CreateLink;
  