import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Comments({ linkUID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(firestore, 'comments'),
        where('linkUID', '==', linkUID)
      );

      const snapshot = await getDocs(q);

      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setComments(fetchedComments);
    };

    fetchComments();
  }, [linkUID]);

  const renderComments = (parentId) => {
    return comments
      .filter(comment => comment.parentCommentUID === parentId)
      .map(comment => (
        <div key={comment.id}>
          <strong>{comment.createdBy}</strong>:
          <p>{comment.text}</p>
          <small>{comment.points} points</small>
          <div style={{ marginLeft: '20px' }}>
            {renderComments(comment.id)}
          </div>
        </div>
      ));
  };

  return (
    <div>
      <h3>Comments:</h3>
      {renderComments(null)}
    </div>
  );
}

export default Comments;
