import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Comments() {
    const [comments, setComments] = useState([]);
    const { linkUID } = useParams();

    useEffect(() => {
      const fetchComments = async () => {
        const q = query(collection(firestore, 'comments'), where('linkUID', '==', linkUID));
  
        try {
          const snapshot = await getDocs(q);
          const fetchedComments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setComments(fetchedComments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
  
      fetchComments();
    }, [linkUID]);

    return (
        <div>
          <h3>Comments:</h3>
          <table>
            <tbody>
              {comments.map(comment => (
                <React.Fragment key={comment.id}>
                  <tr>
                    <td><strong>{comment.createdBy}</strong></td>
                  </tr>
                  <tr>
                    <td>{comment.text}</td>
                  </tr>
                  <tr>
                    <td><small>{comment.points} points</small></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Comments;
