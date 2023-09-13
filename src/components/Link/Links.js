import React from 'react';

function Links() {
  // Example data
  const exampleLinks = [
    {
      id: 1,
      title: 'OpenAI',
      url: 'https://www.openai.com',
      description: 'Discovering and enacting the path to safe artificial general intelligence.'
    },
    {
      id: 2,
      title: 'Google',
      url: 'https://www.google.com',
      description: 'Search the world\'s information, including webpages, images, videos and more.'
    },
    {
      id: 3,
      title: 'React',
      url: 'https://reactjs.org',
      description: 'A JavaScript library for building user interfaces.'
    }
    // ... add more example links as needed
  ];

  return (
    <div>
      <h2>Links</h2>
      <ul>
        {exampleLinks.map(link => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
            <p>{link.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Links;
