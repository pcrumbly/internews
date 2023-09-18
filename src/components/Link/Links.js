import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import LinkCard from './LinkCard';

function Links() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        // Fetch links ordered by points in descending order
        const q = query(collection(firestore, 'links'), orderBy('points', 'desc'));
        const snapshot = await getDocs(q);

        const linksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort links by points and creation time
        const sortedLinks = linksData.sort((a, b) => {
          if (a.points > b.points) return -1;
          if (a.points < b.points) return 1;
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        });

        setLinks(sortedLinks);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div>
      <h3>Today</h3>
      {links.map((link) => (
        <LinkCard key={link.id} linkId={link.id} />
      ))}
    </div>
  );
}

export default Links;
