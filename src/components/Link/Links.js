import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import timeSince from '../../services/myUtils';


function Links() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Create a query against the collection.
    const q = query(collection(firestore, 'links'), orderBy('points', 'desc'));

    // Set up a listener to fetch data in real-time
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const linksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
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
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();

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
                <td><a href={link.url} target="_blank" rel="noopener noreferrer">{link.description}</a></td>
                <td>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                  </a>
                </td>
              </tr>
              <tr>
                <td><span></span></td>
                <td>{link.points} points</td>
                <td>{timeSince(link.createdAt)}</td>
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
  
}

export default Links;
