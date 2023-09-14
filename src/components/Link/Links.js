import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { onSnapshot, collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import timeSince from '../../services/myUtils';


function Links() {
  const [links, setLinks] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});

  const getCommentCount = async (linkID) => {
    const q = query(collection(firestore, 'comments'), where('linkUID', '==', linkID));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  };

  useEffect(() => {
    const fetchLinksAndComments = async () => {
      const q = query(collection(firestore, 'links'), orderBy('points', 'desc'));
      const snapshot = await getDocs(q);
      
      const linksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Use Promise.all to get comment counts for all links at once
      const counts = await Promise.all(
        linksData.map(link => getCommentCount(link.id))
      );

      const newCommentCounts = {};
      linksData.forEach((link, index) => {
        newCommentCounts[link.id] = counts[index];
      });

      setCommentCounts(newCommentCounts);
      
      // Sort the linksData array first by 'points' in descending order
      // and then by 'createdAt' in ascending order
      const sortedLinks = linksData.sort((a, b) => {
        if (a.points > b.points) return -1;
        if (a.points < b.points) return 1;
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      });
      setLinks(sortedLinks);
    }

    fetchLinksAndComments();
  }, []);

  return (
    <div>
      <h2>Today</h2>
      <table>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <tr>
                <td>{links.findIndex((l) => l.id === link.id) + 1}</td>
                <td><button>^</button></td>
                <td>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.description}
                  </a>
                </td>
                <td>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    ({link.url})
                  </a>
                </td>
              </tr>
              <tr>
                <td><span></span></td>
                <td>{link.points} points</td>
                <td>{timeSince(link.createdAt)}</td>
                <td><a href={`/comments/${link.id}`}>{commentCounts[link.id]} comments</a></td>
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  
}

export default Links;
